import Link from 'next/link';
import conn from '@/libs/mysql';

async function loadUserCart(userId) {
  const [cartItems] = await conn.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
  return cartItems;
}

async function CartPage() {
  const userId = 1; // Cambia esto por la lógica para obtener el userId de la cookie o del estado global
  const cartItems = await loadUserCart(userId);

  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-6 bg-white w-2/3">
        <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="mb-4 flex justify-between items-center">
            <div>
              <h4 className="text-xl font-bold">{item.product_name}</h4>
              <p className="text-slate-700">${item.product_price}</p>
              <p className="text-slate-700">Quantity: {item.quantity}</p>
            </div>
            <Link href={`/products/${item.product_id}`}>
              <a className="text-blue-500">View Product</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;