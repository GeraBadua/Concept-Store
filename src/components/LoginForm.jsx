'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      const response = await fetch('/api/admin_auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 1, secure: process.env.NODE_ENV === 'production', path: '/', sameSite: 'None' });
        
        // Decodifica el token para obtener el rol
        const decoded = jwtDecode(data.token);
        const role = decoded.rol_id;

        // Redirige al usuario basado en su rol
        if (role === 1) {
          router.push('/products');
        } else if (role === 2) {
          router.push('/products_seller');
        } else {
          // Redirigir a una página por defecto si el rol no coincide
          router.push('/');
        }

        alert('Login successful!, Welcome to the store.');
      } else {
        setError(data.message || 'Email or password is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('An error occurred, please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don&apos;t have an account?{' '}
        <a onClick={onSwitch} className="text-blue-500 cursor-pointer">
          Register here
        </a>
      </p>
    </div>
  );
}
