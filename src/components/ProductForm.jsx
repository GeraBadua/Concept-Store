import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "", // Agrega image al estado inicial
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id_product) {
      axios.get(`/api/products/${params.id_product}`).then((res) => {
        const productData = res.data[0]; // Acceder al primer objeto del array
        console.log("Product data fetched:", productData);
        setProduct({
          name: productData.name || "",
          price: productData.price || "",
          description: productData.description || "",
          image: productData.image || "", // Actualiza la imagen del estado
        });
      }).catch((error) => {
        console.error("Error fetching product data:", error);
      });
    }
  }, [params.id_product]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (!params.id_product) {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(`/api/products/${params.id_product}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      form.current.reset();
      router.refresh();
      router.push("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          name="price"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="description"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image:
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
            className="ml-4"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id_product ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
