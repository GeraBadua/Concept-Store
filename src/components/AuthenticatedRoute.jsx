'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthenticatedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/admin_auth');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthenticatedRoute;