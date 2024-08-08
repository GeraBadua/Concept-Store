import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const user = await request.json();

    if (!user || !user.email || !user.name || !user.sub) {
      return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
    }

    const { email, name, sub } = user;
    const password = bcrypt.hashSync(sub, 10);

    const [rows] = await conn.query('SELECT * FROM User WHERE email = ?', [email]);

    let user_id;
    let role_id = 3; // Default role for new users
    if (rows.length === 0) {
      const [result] = await conn.query(
        'INSERT INTO User (email, name, password, role_id) VALUES (?, ?, ?, ?)',
        [email, name, password, role_id]
      );
      user_id = result.insertId;
    } else {
      user_id = rows[0].user_id;
      role_id = rows[0].role_id;
    }

    const token = jwt.sign(
      { id: user_id, email, role_id },
      secretKey,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json(
      { message: 'Login successful', token, user: { id: user_id, email, role_id } },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Insert user error:', error.message, error.stack);
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}