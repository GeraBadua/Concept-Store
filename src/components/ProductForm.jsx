import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id_product) {
      axios
        .get(`/api/products/${params.id_product}`)
        .then((res) => {
          const productData = res.data?.data || res.data[0];
          console.log("Product data fetched:", productData);
          setProduct({
            name: productData.name || "",
            price: productData.price || "",
            description: productData.description || "",
            image: productData.image || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setError("Failed to load product data");
        });
    }
  }, [params.id_product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validar tipo de archivo
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only JPEG, PNG, WebP and GIF images are allowed");
      return;
    }

    // Validar tamaño
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const validateForm = () => {
    // Validar nombre
    if (!product.name || product.name.trim().length === 0) {
      setError("Product name is required");
      return false;
    }

    if (product.name.length > 100) {
      setError("Product name must be 100 characters or less");
      return false;
    }

    // Validar precio
    if (!product.price || isNaN(parseFloat(product.price))) {
      setError("Valid price is required");
      return false;
    }

    if (parseFloat(product.price) <= 0) {
      setError("Price must be greater than 0");
      return false;
    }

    // Validate image (required only for new products)
    if (!params.id_product && !file) {
      setError("Product image is required for new products");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name.trim());
    formData.append("price", parseFloat(product.price));
    formData.append("description", product.description.trim());

    if (file) {
      formData.append("image", file);
    }

    try {
      const endpoint = params.id_product ? `/api/products/${params.id_product}` : "/api/products";
      const method = params.id_product ? "put" : "post";

      const response = await axios[method](endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const successMessage = response.data?.message || 
        (params.id_product ? "Product updated successfully" : "Product created successfully");
      
      setSuccess(successMessage);
      form.current.reset();
      setFile(null);
      setProduct({
        name: "",
        price: "",
        description: "",
        image: ""
      });
      
      setTimeout(() => {
        router.refresh();
        router.push("/products");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || 
        (params.id_product ? "Failed to update product" : "Failed to create product");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <form
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 px-8 pb-8 pt-10 shadow-lg shadow-black/30"
        onSubmit={handleSubmit}
        ref={form}
      >
        <button
          type="button"
          aria-label="Cancel"
          onClick={() => router.back()}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-slate-500"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-white mb-6">
          {params.id_product ? "Edit Product" : "Create New Product"}
        </h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200">
            {success}
          </div>
        )}

        <label htmlFor="name" className="block text-sm font-semibold text-slate-200 mb-2">
          Product Name: <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter product name"
          onChange={handleChange}
          value={product.name}
          maxLength="100"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
          required
          disabled={loading}
        />

        <label htmlFor="price" className="block text-sm font-semibold text-slate-200 mb-2 mt-4">
          Product Price: <span className="text-red-400">*</span>
        </label>
        <input
          name="price"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          onChange={handleChange}
          value={product.price}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
          required
          disabled={loading}
        />

        <label htmlFor="description" className="block text-sm font-semibold text-slate-200 mb-2 mt-4">
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Enter product description"
          onChange={handleChange}
          value={product.description}
          maxLength="500"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
          disabled={loading}
        />

        <label className="block text-sm font-semibold text-slate-200 mb-2 mt-4">
          Product Image: {!params.id_product && <span className="text-red-400">*</span>}
        </label>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {product.image && (
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={product.image}
              alt="Product Image"
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="text-sm text-slate-200"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        {file && (
          <div className="mb-4">
            <p className="text-sm text-slate-300 mb-2">Preview:</p>
            <img
              className="w-full max-w-xs object-contain mx-auto my-4 rounded-lg"
              src={URL.createObjectURL(file)}
              alt="Preview"
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => router.back()}
            className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-400 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-400 disabled:bg-slate-600"
          >
            {loading 
              ? "Processing..." 
              : params.id_product 
                ? "Update Product" 
                : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
