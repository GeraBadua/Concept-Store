"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const Auth0Log = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="text-red-600">Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;

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
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-white hover:bg-red-700 text-red-600 font-bold py-2 px-4 rounded border-2 border-red-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Auth0Log;