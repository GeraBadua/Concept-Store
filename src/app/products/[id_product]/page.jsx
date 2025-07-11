import Buttons from "./Buttons";
import conn from "@/libs/mysql";

async function loadProduct(productId) {
  const [data] = await conn.query('SELECT * FROM product WHERE id_product = ?', [
    productId,
  ]);
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id_product);

  if (!product || product.length === 0) {
    return <p>Product not found</p>;
  }

  const productData = product[0];

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">{productData.name}</h3>
          <h4 className="text-4xl font-bold">{productData.price}$</h4>
          <p className="text-slate-700">{productData.description}</p>
          <Buttons productId={productData.id_product} />
        </div>
        {productData.image && (
          <img src={productData.image} className="w-1/3" alt={productData.name} />
        )}
      </div>
    </section>
  );
}

export default ProductPage;
