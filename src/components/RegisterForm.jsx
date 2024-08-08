'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default function RegisterForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('2'); // Default to 'Seller'

  const validateForm = () => {
    if (!email || !password || !name) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: 'warning',
        title: 'All fields are required',
      });
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/admin_auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      const data = await response.json();

      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Register successful!',
        });

        setTimeout(() => {
          onSwitch();
        }, 3000);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'error',
          title: data.message || 'Unknown error',
        });
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: 'error',
        title: 'An error occurred, please try again later.',
      });
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-[#01587a] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#99d8dd]">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e1e8ec] text-[#01587a] rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e1e8ec] text-[#01587a] rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e1e8ec] text-[#01587a] rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-6 bg-[#e1e8ec] text-[#01587a] rounded"
        >
          <option value="1">Admin</option>
          <option value="2">Seller</option>
        </select>
        <button type="submit" className="w-full p-3 bg-[#f3ba00] text-[#01587a] rounded font-bold hover:bg-[#99d8dd] transition-colors duration-300">
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-[#99d8dd]">
        Already have an account?{' '}
        <a onClick={onSwitch} className="text-[#f3ba00] cursor-pointer hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
