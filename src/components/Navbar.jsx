'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jwtDecode } from 'jwt-decode';
import Auth0Log from "./auth0Log";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token || !!user);

    if (token) {
      try {
        // Decodificar el token
        const decoded = jwtDecode(token);
        setUserRole(decoded.role_id);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
      }
    }
  }, [pathname, user]);

  const handleLogout = async () => {
    Cookies.remove('token'); // Elimina la cookie de token
    window.location.href = '/api/auth/logout'; // Realiza el logout de Auth0
  };

  const handleRedirect = () => {
    if (userRole === 1) {
      router.push('/products_admin');
    } else if (userRole === 2) {
      router.push('/products_seller');
    } else if (userRole === 3) {
      router.push('/products_client');
    } else {
      router.push('/');
    }
  };

  return (
    <header className="w-full p-4 bg-red-600 shadow-lg flex justify-between items-center">
      <button onClick={handleRedirect} className="text-3xl font-bold text-white">
        Concept Store
      </button>

      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-white hover:bg-red-700 text-red-600 font-bold py-2 px-4 rounded">
          Logout
        </button>
      ) : (
        <Auth0Log />
      )}
    </header>
  );
};

export default Navbar;
