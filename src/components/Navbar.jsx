'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Auth0Log from "./auth0Log";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, [pathname]);
  
  const handleLogout = async () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <header className="w-full p-4 bg-red-600 shadow-lg flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold text-white">Concept Store</h1>
      </Link>
    
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
