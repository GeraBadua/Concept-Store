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
      <AuthenticatedRoute allowedRoles={[2]}> {/* Only seller */}
        <h1 className="text-white text-center text-xl">Seller</h1>
        <div className="flex justify-start mb-4">
          <Link href="/new">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"> {/* Added ml-4 */}
              Add new product
            </button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id_product} product={product} basePath="/products_seller"/>
          ))}
        </div>
      </AuthenticatedRoute>
    </section>
  );
}

export default ProductsPage;
