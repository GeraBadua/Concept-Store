// src/app/api/cart/products/route.js
import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function GET(request) {
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
      SELECT p.id_product, p.name, p.description, p.price, ci.quantity
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.id_product
      JOIN cart c ON ci.cart_id = c.cart_id
      WHERE c.user_id = ?
    `, [userId]);

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart products:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
