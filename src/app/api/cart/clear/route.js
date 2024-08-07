// src/app/api/cart/clear/route.js
import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function DELETE(request) {
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

    // Obtener el carrito del usuario
    const [cartRows] = await conn.query('SELECT cart_id FROM cart WHERE user_id = ?', [userId]);
    if (cartRows.length === 0) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cartId = cartRows[0].cart_id;

    // Eliminar el carrito y sus elementos
    await conn.query('DELETE FROM cart_item WHERE cart_id = ?', [cartId]);
    await conn.query('DELETE FROM cart WHERE cart_id = ?', [cartId]);

    return NextResponse.json({ message: 'Cart cleared successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
