import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import ProductCard from "@/components/ProductCard";
import conn from '@/libs/mysql';

async function loadProducts() {
  const [products] = await conn.query('SELECT * FROM product');
  return products;
}

export const dynamic = 'force-dynamic';

async function ProductsPage() {
  const products = await loadProducts();

  return (
      <div>
          <h1 className="text-white text-center text-xl">Client</h1>
          <div className="grid gap-4 grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id_product} product={product} basePath="/products_client"/>
            ))}
          </div>
      </div>
  );
}

export default ProductsPage;