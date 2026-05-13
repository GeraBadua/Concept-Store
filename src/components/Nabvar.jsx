'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Detectar modo demo via API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setIsDemoMode(data.mode === 'demo'))
      .catch(() => setIsDemoMode(false));
  }, []);

  return (
    <nav className="bg-zinc-900/80 backdrop-blur text-white py-4 mb-2 border-b border-slate-800">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h3 className="text-2xl font-semibold">Concept Store</h3>
          </Link>
          
          {isDemoMode && (
            <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full font-semibold">
              DEMO MODE
            </span>
          )}
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/products"
              className="text-sm text-slate-200 hover:text-white"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/new"
              className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-400"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
      
      {isDemoMode && (
        <div className="bg-orange-600 text-white text-sm text-center py-1">
          ⚠️ Demo mode - changes are not saved and will reset on refresh.
        </div>
      )}
    </nav>
  );
}

export default Navbar;
