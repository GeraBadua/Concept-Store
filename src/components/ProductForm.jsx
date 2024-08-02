import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    id_provider: "",
    inventory: "",
  });
  const [file, setFile] = useState(null);
  const [providers, setProviders] = useState([]);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  // Obtener proveedores
  useEffect(() => {
    axios.get(`/api/providers`)
      .then((res) => {
        setProviders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  // Obtener detalles del producto si se está editando
  useEffect(() => {
    if (params.id_product) {
      axios.get(`/api/products/${params.id_product}`)
        .then((res) => {
          const productData = res.data[0];
          setProduct({
            name: productData.name || "",
            price: productData.price || "",
            description: productData.description || "",
            image: productData.image || "",
            id_provider: productData.id_provider || "",
            inventory: productData.inventory || "",
          });
        })
        .catch((error) => {
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
    formData.append("id_provider", product.id_provider);
    formData.append("inventory", product.inventory);

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

  const handleClose = () => {
    router.push("/products");
  };

  return (
    <div className="relative bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-black rounded-full w-6 h-6 flex items-center justify-center"
      >
        X
      </button>
      <form onSubmit={handleSubmit} ref={form}>
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

        <label
          htmlFor="id_provider"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Provider:
        </label>
        <select
          name="id_provider"
          onChange={handleChange}
          value={product.id_provider}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        >
          <option value="">Select a provider</option>
          {providers.map((provider) => (
            <option key={provider.id_provider} value={provider.id_provider}>
              {provider.name}
            </option>
          ))}
        </select>

        <label htmlFor="inventory" className="block text-gray-700 text-sm font-bold mb-2">
        Product Inventory:
      </label>
        <input
          name="inventory"
          type="number"
          placeholder="Inventory count"
          onChange={handleChange}
          value={product.inventory}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image:
        </label>
        <div className="flex items-center mb-4">
          {product.image && (
            <Image
              className="w-24 h-24 object-cover rounded"
              src={product.image}
              width={96}
              height={96}
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
          <Image
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            width={384}
            height={384}
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