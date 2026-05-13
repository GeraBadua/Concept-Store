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
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h3 className="text-3xl">Concept Store</h3>
          </Link>
          
          {isDemoMode && (
            <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full font-semibold">
              DEMO MODE
            </span>
          )}
        </div>

        <ul>
          <li>
            <Link href="/new" className="text-sky-500 hover:text-sky-400">
              New
            </Link>
          </li>
        </ul>
      </div>
      
      {isDemoMode && (
        <div className="bg-orange-600 text-white text-sm text-center py-1">
          ⚠️ Demo mode - changes are not saved. Configure MySQL to persist data.
        </div>
      )}
    </nav>
  );
}

export default Navbar;