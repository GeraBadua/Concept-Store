import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import ProductCard from "@/components/ProductCard";
import conn from '@/libs/mysql';
import Link from 'next/link';

async function loadProducts() {
  const [products] = await conn.query('SELECT * FROM product');
  return products;
}

export const dynamic = 'force-dynamic';

async function ProductsPage() {
  const products = await loadProducts();

  return (
    <AuthenticatedRoute>
      <ul>
          <li>
            <Link href="/new" className="text-sky-500 hover:text-sky-400">
              New
            </Link>
          </li>
      </ul>
      <div className="grid gap-4 grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id_product} product={product} />
        ))}
      </div>
    </AuthenticatedRoute>
  );
}

export default ProductsPage;
