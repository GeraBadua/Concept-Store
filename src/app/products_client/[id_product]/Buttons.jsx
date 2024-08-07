"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

function Buttons({ productId }) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/products_client");
  };

  // Función para obtener el userId desde el JWT
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // O obtén el token de las cookies si lo tienes almacenado ahí
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // Ajusta esto según la estructura de tu token
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("Are you sure you want to delete this product?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Purchase
      </button>
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={async () => {
          try {
            const userId = getUserIdFromToken();
            if (!userId) {
              alert("User not authenticated");
              return;
            }
            const res = await axios.post("/api/cart", { userId, productId, quantity: 1 });
            if (res.status === 200) {
              alert("Product added to cart successfully!");
              router.push("/cart");
            } else {
              alert("Failed to add product to cart.");
            }
          } catch (error) {
            console.error("Failed to add product to cart:", error);
            alert("An error occurred while adding the product to the cart.");
          }
        }}
      >
        Add to cart
      </button>
      <button
          onClick={handleClose}
          className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        >
          X
        </button>
    </div>
  );
}

export default Buttons;