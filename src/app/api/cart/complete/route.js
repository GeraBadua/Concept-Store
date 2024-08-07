// src/app/api/cart/complete/route.js
import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    // Verificar si el token está en la cookie
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Decodificar el token
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    // Obtener los productos en el carrito
    const [cartItems] = await conn.query(`
      SELECT ci.cart_id, ci.product_id, ci.quantity, p.price
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.id_product
      JOIN cart c ON ci.cart_id = c.cart_id
      WHERE c.user_id = ?
    `, [userId]);

    if (cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // Calcular el total de la venta
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Insertar en la tabla de ventas
    const [saleResult] = await conn.query('INSERT INTO sales (user_id, total) VALUES (?, ?)', [userId, total]);
    const saleId = saleResult.insertId;

    // Insertar los elementos de la venta
    const saleItems = cartItems.map(item => [saleId, item.product_id, item.quantity, item.price]);
    await conn.query('INSERT INTO sales_item (sale_id, product_id, quantity, price) VALUES ?', [saleItems]);

    // Eliminar el carrito y sus elementos
    const cartId = cartItems[0].cart_id;
    await conn.query('DELETE FROM cart_item WHERE cart_id = ?', [cartId]);
    await conn.query('DELETE FROM cart WHERE cart_id = ?', [cartId]);

    return NextResponse.json({ message: 'Sale completed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error completing sale:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
