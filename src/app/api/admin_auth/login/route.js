import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const [rows] = await conn.query('SELECT * FROM User WHERE email = ?', [email]);
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Invalid email credentials' }, { status: 401 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password credentials' }, { status: 401 });
    }

    // Incluir rol_id en el payload del token
    const token = jwt.sign(
      { id: user.user_id, email: user.email, rol_id: user.rol_id },
      secretKey,
      { expiresIn: '1h' }
    );

    // Configurar la cookie con el token
    const response = NextResponse.json(
      { message: 'Login successful', token, user: { id: user.user_id, email: user.email, rol_id: user.rol_id } },
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Solo en producción debería ser `true`
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Usa 'None' en producción con HTTPS, 'Lax' para desarrollo
      maxAge: 3600,
      path: '/',
    });   

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
