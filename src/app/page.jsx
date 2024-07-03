import Link from "next/link";
import "./globals.css";
import React from 'react';


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Modules Concept Store</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/products" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Page Productos &rarr;</h2>
          <p className="text-gray-700">Production Products</p>
          
        </Link>
        {/* Agrega más cards aquí según sea necesario */}<a href="/api/auth/login">Login</a>
      </div>
    </div>
  );
};

export default Home;
