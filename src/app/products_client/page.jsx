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
    <section>
      <br></br>
      <br></br>
    <AuthenticatedRoute allowedRoles={[3]}>
      <div>
          <h1 className="text-white text-center text-xl">Client</h1>
          <ul>
            <li>
              <Link href="/cart_client" className="text-sky-500 hover:text-sky-400">
                Ir a carrito
              </Link>
            </li>
          </ul>
          <div className="grid gap-4 grid-cols-4">
            {products.map(product => (
              <ProductCard className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" key={product.id_product} product={product} basePath="/products_client"/>
            ))}
          </div>
      </div>
    </AuthenticatedRoute>
    </section>
    );
}

export default ProductsPage;