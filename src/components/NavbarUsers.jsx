'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Auth0Log from '../components/auth0Log';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleLogout = async () => {
    Cookies.set('token', '', { expires: new Date(0) });
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <header className="w-full p-4 bg-gray-800 shadow-lg flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold text-white">Concept Store</h1>
      </Link>
    
      <Auth0Log /> {/* Aquí es donde usas el componente Auth0Log */}

    </header>
  );
};

export default Navbar;
