import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    console.log('Processing registration request');
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name || !role) {
      console.log('Validation error: missing fields');
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Checking if user exists');
    const [users] = await conn.query('SELECT user_id FROM User WHERE email = ?', [email]); // Ajuste aquí
    if (users.length > 0) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Inserting new user into database');
    const [result] = await conn.query(
      'INSERT INTO User (email, password, name, rol_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, role]
    );

    if (result.affectedRows === 1) {
      console.log('User registered successfully');
      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } else {
      console.log('Failed to register user:', result);
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred, please try again later.', details: error.message },
      { status: 500 }
    );
  }
}
