'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FaShoppingCart } from 'react-icons/fa';
import Auth0Log from "./auth0Log";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role_id);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    Cookies.remove('token');
    window.location.href = '/api/auth/logout';
  };

  const handleCartRedirect = () => {
    if (userRole === 1) {
      router.push('/cart_admin');
    } else if (userRole === 2) {
      router.push('/cart_seller');
    } else if (userRole === 3) {
      router.push('/cart_client');
    } else {
      router.push('/');
    }
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
    <header 
      className={`w-full p-4 shadow-lg flex justify-between items-center transition-colors duration-300 ${
        isScrolled || isHovered ? 'bg-[#e1e8ec] text-[#01587a]' : 'bg-transparent text-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: 10 }}  // Ajustar el z-index para que la navbar esté siempre encima
    >
      <button onClick={handleRedirect} className="text-3xl font-bold" style={{ color: isScrolled || isHovered ? '#01587a' : '#f3ba00' }}>
        Concept Store
      </button>
      
      <div className="flex items-center space-x-4 z-20"> {/* Asegúrate de que los botones tengan un z-index más alto */}
        {isAuthenticated && (
          <>
            <span className="text-white hover:text-[#01587a] transition-colors duration-300" style={{ color: isScrolled || isHovered ? '#01587a' : '#f3ba00' }}>
              {userEmail}
            </span><button onClick={handleCartRedirect} className="hover:text-[#01587a] transition-colors duration-300" style={{ color: isScrolled || isHovered ? '#01587a' : '#f3ba00' }}>
              <FaShoppingCart size={24} />
            </button>
          </>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className={`font-bold py-2 px-4 rounded ${
            isScrolled || isHovered ? 'bg-[#01587a] text-white' : 'bg-[#f3ba00] text-[#01587a]'
          } hover:bg-[#99d8dd] hover:text-black transition-colors duration-300 z-20`}>
            Logout
          </button>
        ) : (
          <Auth0Log />
        )}
      </div>
    </header>
  );
};

export default Navbar;
