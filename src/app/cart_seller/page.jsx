"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const CartSeller = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get('/api/cart/products', { withCredentials: true });
        setCartItems(res.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCompleteSale = async () => {
    try {
      const res = await axios.post('/api/cart/complete', {}, { withCredentials: true });
      if (res.status === 200) {
        alert('Sale completed successfully!');
        setCartItems([]); // Limpiar el carrito en el estado
      }
    } catch (error) {
      console.error('Error completing sale:', error);
      alert('Failed to complete sale.');
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await axios.delete('/api/cart/clear', { withCredentials: true });
      if (res.status === 200) {
        alert('Cart cleared successfully!');
        setCartItems([]); // Limpiar el carrito en el estado
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id_product} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-bold">Price: ${item.price}</p>
              <p className="text-gray-800">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleCompleteSale}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Complete Sale
        </button>
        <button
          onClick={handleClearCart}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSeller;
