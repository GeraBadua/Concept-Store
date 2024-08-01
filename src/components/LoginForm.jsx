'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Error',
        text: 'Please enter your email and password.',
      });
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
        Cookies.set('token', data.token, { expires: 1 });
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome to the store.',
        }).then(() => {
          router.push('/products');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Email or password is incorrect. Please try again.',
        });
      }
    } catch (error) {
      console.error('Login error', error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
