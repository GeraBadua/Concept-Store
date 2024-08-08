"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

function Buttons({ productId }) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/products_client");
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.post("/api/cart", { productId }, { withCredentials: true });
      if (res.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Product added to cart successfully!'
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: 'error',
        title: 'Failed to add product to cart.'
      });
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
