'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isOnProductsPage = pathname === "/products";

  return (
    <header className="w-full p-4 bg-gray-800 shadow-lg flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold text-white">Concept Store</h1>
      </Link>
    
      {isOnProductsPage ? (
        <Link href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </Link>
      ) : (
        <Link href="/admin_auth" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      )}
    </header>
  );
};

export default Navbar;
