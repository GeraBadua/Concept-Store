import ProductCard from "@/components/ProductCard";
import { getDatabase } from "@/libs/useDatabase";

// Load products from database or demo
async function loadProducts() {
  const db = await getDatabase();
  return db.getAll();
}

export const dynamic = 'force-dynamic';

// Products page component
async function ProductsPage() {
  const products = await loadProducts();

  return (
    <section className="py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Catalog
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Products
          </h2>
          <p className="mt-2 text-slate-300">
            Explore the catalog and jump into details.
          </p>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id_product} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
