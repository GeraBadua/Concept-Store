'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... (el resto de la lógica de handleLogin permanece igual)
  };

  return (
    <div className="max-w-md w-full p-6 bg-[#01587a] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#99d8dd]">Login</h2>
      {error && <p className="text-[#f3ba00] mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e1e8ec] text-[#01587a] rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-[#e1e8ec] text-[#01587a] rounded"
          required
        />
        <button type="submit" className="w-full p-3 bg-[#f3ba00] text-[#01587a] rounded font-bold hover:bg-[#99d8dd] transition-colors duration-300">
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-[#99d8dd]">
        Don&apos;t have an account?{' '}
        <a onClick={onSwitch} className="text-[#f3ba00] cursor-pointer hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}
