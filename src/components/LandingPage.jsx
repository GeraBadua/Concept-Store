import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-900 text-white">
      
      <main className="container mx-auto p-8 flex-1">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to Concept Store</h2>
          <p className="text-xl mb-8">We offer the latest mobile technology from top brands such as Apple, Samsung, Xiaomi, Huawei, and more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <img src="https://via.placeholder.com/150?text=Apple" alt="Apple" className="w-full h-auto rounded-lg shadow-lg" />
            <img src="https://via.placeholder.com/150?text=Samsung" alt="Samsung" className="w-full h-auto rounded-lg shadow-lg" />
            <img src="https://via.placeholder.com/150?text=Xiaomi" alt="Xiaomi" className="w-full h-auto rounded-lg shadow-lg" />
            <img src="https://via.placeholder.com/150?text=Huawei" alt="Huawei" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </section>
      </main>
      <footer className="w-full p-4 bg-gray-800 text-center">
        <p>&copy; 2024 Concept Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
