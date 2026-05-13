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

    // Validar imagen (requerida solo para nuevos productos)
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
        ref={form}
      >
        <h2 className="text-2xl font-bold mb-6">
          {params.id_product ? "Edit Product" : "Create New Product"}
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Product Name: <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter product name"
          onChange={handleChange}
          value={product.name}
          maxLength="100"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          required
          disabled={loading}
        />

        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Product Price: <span className="text-red-500">*</span>
        </label>
        <input
          name="price"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          required
          disabled={loading}
        />

        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Enter product description"
          onChange={handleChange}
          value={product.description}
          maxLength="500"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          disabled={loading}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image: {!params.id_product && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center mb-4">
          {product.image && (
            <img
              className="w-24 h-24 object-cover rounded"
              src={product.image}
              alt="Product Image"
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="ml-4"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              className="w-full max-w-xs object-contain mx-auto my-4"
              src={URL.createObjectURL(file)}
              alt="Preview"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
        >
          {loading 
            ? "Processing..." 
            : params.id_product 
              ? "Update Product" 
              : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
