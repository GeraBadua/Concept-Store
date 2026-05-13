import Link from "next/link";
import "./globals.css";

const Home = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Demo ready flow
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mt-3">
            Concept Store
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl">
            Explore the full flow: list, detail, create, and edit products.
            Everything runs in demo without a database.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Link
            href="/products"
            className="block p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700"
          >
            <h2 className="text-xl font-semibold text-white mb-2">View products</h2>
            <p className="text-slate-300">
              Start with the list and jump into details.
            </p>
          </Link>

          <Link
            href="/new"
            className="block p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Create product</h2>
            <p className="text-slate-300">
              Simulate creation with image and validation.
            </p>
          </Link>

          <Link
            href="/products/1"
            className="block p-6 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700"
          >
            <h2 className="text-xl font-semibold text-white mb-2">View detail</h2>
            <p className="text-slate-300">
              Open a product and try edit or delete.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
