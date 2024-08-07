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
      router.push('/admin_auth');
    } else {
      try {
        // Decodificar el token
        const decoded = jwtDecode(token);
        const role = decoded.role_id;

        // Redirigir basado en el role
        if (allowedRoles && !allowedRoles.includes(role)) {
          if (role === 1) {
            router.push('/products');
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
