import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const [rows] = await conn.query('SELECT * FROM User WHERE email = ?', [email]);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Si llegamos aquí, el login fue exitoso
    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}