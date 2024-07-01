import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await conn.query(
      'INSERT INTO User (email, password, name, rol_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, 1] // rol_id default as 1
    );

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
