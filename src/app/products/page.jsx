import ProductCard from "@/components/ProductCard";
import conn from '@/libs/mysql';

// Función para cargar productos desde la base de datos
async function loadProducts() {
  const [products] = await conn.query('SELECT * FROM product');
  return products;
}

export const dynamic = 'force-dynamic';

// Componente de página de productos
async function ProductsPage() {
  const products = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id_product} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
