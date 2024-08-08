// Auth0Log.jsx
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const Auth0Log = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch('/api/auth/[auth0]/insertUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        const token = data.token;

        if (token) {
          Cookies.set('token', token, { path: '/' });
          const decoded = jwtDecode(token);
          const role = decoded.role_id;

          if (role === 3) {
            router.push('/products_client');
          } else {
            router.push('/');
          }
        }
      }
    };

    fetchData();
  }, [user, router]);

  if (isLoading) return <div className="text-red-600">Loading...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;

  const handleLogin = () => {
    window.location.href = '/api/auth/login?returnTo=/products_client';
  };

  return (
    <div>
      {!user && (
        <button
          onClick={handleLogin}
          className="bg-[#01587a] hover:bg-[#5cb3c1] text-white font-bold py-2 px-4 rounded border-2 border-[#99d8dd]"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Auth0Log;
