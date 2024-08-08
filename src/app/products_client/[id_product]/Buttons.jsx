"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/products_client");
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.post("/api/cart", { productId }, { withCredentials: true });
      if (res.status === 200) {
        alert("Product added to cart successfully!");
      }
    } catch (error) {
      alert("Failed to add product to cart.");
      console.error(error);
    }
  };

  return (
    <div className="flex gap-x-2 justify-center mt-20">
      <button
        onClick={handleClose}
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        X
      </button>
      <button
        className="text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Buttons;
