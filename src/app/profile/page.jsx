'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import ProfileClient from '@/components/user-client';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      router.push('/');
    }
  }, [router]);

  if (!user) {
    return null; // Or a loading indicator
  }

  return (
    <div className="flex items-center justify-center w-full mt-10 px-44">
      <div className="flex items-center w-full justify-between">
        <div>
          <h1 className="text-2xl mb-4 align-center text-white">User Information</h1>
          <ProfileClient user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
