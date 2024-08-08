import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; // Asegúrate de tener esta clave en tu .env

export async function POST(request) {
  try {
    const user = await request.json();

    if (!user || !user.email || !user.name || !user.sub) {
      return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
    } 


    const { email, name, sub } = user;
    const password = bcrypt.hashSync(sub, 10); // Hasheamos el sub de Auth0 como contraseña

    // Verificar si el usuario ya existe
    const [rows] = await conn.query('SELECT * FROM User WHERE email = ?', [email]);

    let id;
    let role_id = 3; // Rol por defecto para nuevos usuarios
    if (rows.length === 0) {
      // Insertar nuevo usuario en la base de datos
      const [result] = await conn.query(
        'INSERT INTO User (email, name, password, role_id) VALUES (?, ?, ?, ?)',
        [email, name, password, role_id]
      );
      user_id = result.insertId; // Obtener el ID del nuevo usuario
    } else {
      // Usuario ya existe, obtenemos su rol y user_id
      user_id = rows[0].id;
      role_id = rows[0].role_id;
    }

    // Crear un token para el usuario
    const token = jwt.sign(
      { id, email, role_id },
      secretKey,
      { expiresIn: '1h' }
    );

    // Crear la respuesta y configurar la cookie
    const response = NextResponse.json(
      { message: 'Login successful', token, user: { id, email, role_id } },
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
    console.error('Insert user error:', error.message, error.stack);
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }  
}
