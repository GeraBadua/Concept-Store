// src/app/api/cart/route.js
import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { productId } = await request.json();
    
    // Verificar si el token está en la cookie
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie?.value;
    console.log('Token from cookies:', token); // Agregar mensaje de depuración
    
    if (!token) {
      console.log('No token found in cookies');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Decodificar el token
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.log('Invalid token:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    // Verificar si el carrito existe para el usuario
    const [cartRows] = await conn.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
    let cartId;
    if (cartRows.length === 0) {
      // Crear un nuevo carrito si no existe
      const [result] = await conn.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
      cartId = result.insertId;
    } else {
      cartId = cartRows[0].cart_id;
    }

    // Verificar si el producto ya está en el carrito
    const [cartItemRows] = await conn.query('SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
    if (cartItemRows.length === 0) {
      // Agregar el producto al carrito si no está
      await conn.query('INSERT INTO cart_item (cart_id, product_id, quantity) VALUES (?, ?, 1)', [cartId, productId]);
    } else {
      // Incrementar la cantidad si ya está en el carrito
      await conn.query('UPDATE cart_item SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
    }

    return NextResponse.json({ message: 'Product added to cart successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
