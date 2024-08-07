'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthenticatedRoute = ({ children, allowedRoles }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // Redirigir al login adecuado dependiendo de la ruta actual
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/products_admin') || currentPath.startsWith('/products_seller') || currentPath.startsWith('/new')) {
        router.push('/admin_auth');
      } else if (currentPath.startsWith('/products_client')) {
        router.push('/api/auth/login');
      }
    } else {
      try {
        // Decodificar el token
        const decoded = jwtDecode(token);
        const role = decoded.role_id;

        // Redirigir basado en el role si no tiene permitido acceder a la ruta
        if (allowedRoles && !allowedRoles.includes(role)) {
          if (role === 1) {
            router.push('/products_admin');
          } else if (role === 2) {
            router.push('/products_seller');
          } else if (role === 3) {
            router.push('/products_client');
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        router.push('/');
      }
    }
  }, [allowedRoles, router]);

  return <>{children}</>;
};

export default AuthenticatedRoute;
