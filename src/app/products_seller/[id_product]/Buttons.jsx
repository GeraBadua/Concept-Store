"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Buttons({ productId }) {
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const handleClose = () => {
    router.push("/products_seller");
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
      Toast.fire({
        icon: 'error',
        title: 'Failed to add product to cart.'
      });
      console.error(error);
    }
  };

  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={async () => {
          if (confirm("Are you sure you want to delete this product?")) {
            const res = await axios.delete("/api/products/" + productId, { withCredentials: true });
            if (res.status === 204) {
              router.push("/products_seller");
              router.refresh();
              Toast.fire({
                icon: 'success',
                title: 'Product deleted successfully.'
              });
            }
          }
        }}
      >
        Delete
      </button>
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          router.push(`/products_seller/edit/${productId}`);
        }}
      >
        Edit
      </button>
      <button
        onClick={handleClose}
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
