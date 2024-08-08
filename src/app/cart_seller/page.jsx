"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PaymentModal from '@/components/PaymentModal'; // Asegúrate de importar el modal

const CartSeller = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get('/api/cart/products', { withCredentials: true });
        setCartItems(res.data);
        const totalAmount = res.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put('/api/cart/update', { productId, quantity }, { withCredentials: true });
      if (res.status === 200) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id_product === productId ? { ...item, quantity } : item
          )
        );
        const newTotal = cartItems.reduce((sum, item) => {
          if (item.id_product === productId) {
            return sum + item.price * quantity;
          }
          return sum + item.price * item.quantity;
        }, 0);
        setTotal(newTotal);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity.');
    }
  };

  const handleIncrease = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(productId, newQuantity);
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete('/api/cart/item', { data: { productId }, withCredentials: true });
      if (res.status === 200) {
        setCartItems(prevItems => prevItems.filter(item => item.id_product !== productId));
        const newTotal = cartItems.reduce((sum, item) => {
          if (item.id_product !== productId) {
            return sum + item.price * item.quantity;
          }
          return sum;
        }, 0);
        setTotal(newTotal);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item.');
    }
  };

  const handleCompleteSale = () => {
    setIsModalOpen(true);
  };

  const handleCompletePurchase = async (method) => {
    try {
      const res = await axios.post('/api/cart/complete', {}, { withCredentials: true });
      if (res.status === 200) {
        alert(`Sale completed successfully with ${method}!`);
        setCartItems([]); // Limpiar el carrito en el estado
        setTotal(0); // Restablecer el total
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
        setTotal(0); // Restablecer el total
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart.');
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center text-white">Your cart is empty.</div>;
  }

  return (
    <section className="flex justify-center items-center h-auto pt-20">
        
    <br></br>
    <br></br>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id_product} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row">
            {item.image && (
              <Image
                src={item.image}
                width={128} // Añadir el ancho adecuado
                height={128} // Añadir la altura adecuada
                className="w-32 h-32 object-cover mr-4 rounded"
                alt={item.name}
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-bold">Price: ${item.price}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDecrease(item.id_product, item.quantity)}
                >
                  -
                </button>
                <span className="text-gray-800">{item.quantity}</span>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleIncrease(item.id_product, item.quantity)}
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleRemove(item.id_product)}
                >
                  Remove
                </button>
              </div>
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
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCompletePurchase={handleCompletePurchase}
        total={total}
      />
    </div>
    </section>
  );
};

export default CartSeller;
