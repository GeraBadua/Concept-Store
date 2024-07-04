'use client';
import { useState } from 'react';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showLogin ? (
        <LoginForm onSwitch={toggleForm} />
      ) : (
        <RegisterForm onSwitch={toggleForm} />
      )}
    </div>
  );
}
