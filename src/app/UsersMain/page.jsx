"use client"; // Asegura que este componente se renderiza en el cliente

import React from 'react';
import Image from 'next/image';
import NavbarUsers from '../../components/NavbarUsers';


const UserMain = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white"><NavbarUsers></NavbarUsers>
      <main className="flex-grow container mx-auto p-8">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to Concept Store Users Page</h2>
          <p className="text-xl mb-8">We offer the latest mobile technology from top brands such as Apple, Samsung, Xiaomi, Huawei, and more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Apple', 'Samsung', 'Xiaomi', 'Huawei'].map((brand) => (
              <div key={brand} className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <Image 
                  src={`/images/${brand}.jpeg`} 
                  alt={brand} 
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
            ))}
          </div>
          <p className="text-m mb-8 mx-auto text-center">If you are not a user click <a href="/">HERE</a> to go to the ADMINISTRATOR page.</p>
        </section>
      </main>
      <footer className="w-full p-4 bg-gray-800 text-center mt-auto">
        <p>&copy; 2024 Concept Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserMain;