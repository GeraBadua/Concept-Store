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
    <AuthenticatedRoute allowedRoles={[1]}> {/* Only admin */}
      <h1 className="text-white text-center text-xl">Admin</h1>
      <div className="flex justify-start mb-4 space-x-4"> {/* Flex container with space between buttons */}
        <Link href="/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"> {/* Added ml-4 */}
            Add new product
          </button>
        </Link>
        <Link href="/reports_sales">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"> {/* Added ml-4 */}
            Reports Sales
          </button>
        </Link>
        <Link href="/providers">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"> {/* Added ml-4 */}
            Providers
          </button>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id_product} product={product} basePath="/products_admin"/>
        ))}
      </div>
    </AuthenticatedRoute>
  );
}

export default ProductsPage;
