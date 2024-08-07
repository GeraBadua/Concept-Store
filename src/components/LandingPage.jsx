"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import dynamic from 'next/dynamic';

const CarouselComponent = dynamic(() => import('react-responsive-carousel').then(mod => mod.Carousel), {
  ssr: false,
});

const LandingPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-red-600">
      <main className="flex-grow container mx-auto p-8 flex flex-col justify-between">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to Concept Store Administrator Page</h2>
          <p className="text-xl mb-8">We offer the latest mobile technology from top brands such as Apple, Samsung, Xiaomi, Huawei, and more.</p>
          
          <div className="mb-8">
            {isClient && (
              <CarouselComponent 
                autoPlay 
                infiniteLoop 
                interval={5000} 
                showStatus={false} 
                showThumbs={false}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {['Apple', 'Samsung', 'Xiaomi', 'Huawei'].map((brand) => (
                  <div key={brand} className="relative w-full h-96">
                    <Image
                      src={`/images/${brand}.jpeg`}
                      alt={brand}
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </div>
                ))}
              </CarouselComponent>
            )}
          </div>
        </section>
        
        <div className="text-center mb-4">
          <p className="text-m mx-auto text-center">
            If you are an administrator click{' '}
            <Link href="/admin_auth" className="text-red-600 hover:text-red-800 underline">
              HERE
            </Link>{' '}
            to go to the administrator login.
          </p>
        </div>
      </main>
      
      <footer className="bg-red-600 p-4 text-center text-white">
        <p>&copy; 2024 Concept Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
