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
    <div className="min-h-screen flex flex-col bg-cover bg-center text-white" >
      <main className="flex-grow container mx-auto p-8 flex flex-col justify-between">
        <section className="text-center mb-8 mt-20">
          <h2 className="text-6xl font-extrabold mb-4" style={{ color: '#01587a' }}>Welcome to Concept Store</h2>
          <p className="text-2xl mb-8" style={{ color: '#5cb3c1' }}>A page that offers a great variety of the most luxurious perfumes in the marktet.</p>
          
          <div className="mb-8">
            {isClient && (
              <CarouselComponent
                autoPlay
                infiniteLoop
                interval={5000}
                showStatus={false}
                showThumbs={false}
                className="bg-[#e1e8ec] rounded-lg shadow-lg overflow-hidden"
              >
                {['ACQUA', 'Dior', 'LV', 'TomFord'].map((brand) => (
                  <div key={brand} className="relative w-full h-96">
                    <Image
                      src={`/images/${brand}.jpeg`}
                      alt={brand}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      priority
                    />
                  </div>
                ))}
              </CarouselComponent>
            )}
          </div>
        </section>
        
        <div className="text-center mb-4">
          <p className="text-xl mx-auto text-center" style={{ color: '#99d8dd' }}>
            If you are an administrator click{' '}
            <Link href="/admin_auth" className="text-[#f3ba00] hover:text-[#e1e8ec] underline">
              HERE
            </Link>{' '}
            to go to the administrator login.
          </p>
        </div>
      </main>
      
      <footer className="bg-[#01587a] p-4 text-center text-white">
        <p>&copy; 2024 Concept Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
