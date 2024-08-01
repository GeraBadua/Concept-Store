"use client"; // Asegura que este componente se renderiza en el cliente

import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const Auth0Log = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  const handleLogin = () => {
    window.location.href = '/api/auth/login?returnTo=/products_client';
  };

  return (
    <div>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login as user
        </button>
      )}
    </div>
  );
};

export default Auth0Log;
