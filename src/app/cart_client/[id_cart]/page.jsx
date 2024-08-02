import conn from '@/libs/mysql';

async function loadCart(userId) {
  const [cartItems] = await conn.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
  return cartItems;
}

async function CartPage({ params }) {
  const cartItems = await loadCart(params.id_cart);

  if (!cartItems || cartItems.length === 0) {
    return <p>Cart is empty</p>;
  }

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">Your Cart</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <h4 className="text-xl font-bold">{item.product_name}</h4>
              <p className="text-slate-700">${item.product_price}</p>
              <p className="text-slate-700">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CartPage;