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
    <div className="flex gap-x-2 justify-end mt-2">
     
      <button
        onClick={handleClose}
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
      >
        X
      </button>
      <button
        className="text-white bg-green-500 hover:bg-green-700 py-2 px-3 rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Buttons;
