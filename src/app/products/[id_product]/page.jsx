import Buttons from "./Buttons";
import { getDatabase } from "@/libs/useDatabase";

async function loadProduct(productId) {
  const db = await getDatabase();
  const product = await db.getById(productId);
  return product;
}

async function ProductPage({ params }) {
  const productData = await loadProduct(params.id_product);

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-full text-slate-200">
        Product not found
      </div>
    );
  }

  const priceValue = Number(productData.price);
  const formattedPrice = Number.isFinite(priceValue)
    ? `$${priceValue.toFixed(2)}`
    : productData.price;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-black/30">
            {productData.image ? (
              <img
                src={productData.image}
                className="h-full w-full object-cover"
                alt={productData.name}
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center text-slate-300">
                No image
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Product detail
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">
              {productData.name}
            </h3>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">
              {formattedPrice}
            </p>
            <p className="mt-4 text-slate-300">
              {productData.description}
            </p>

            <div className="mt-6">
              <Buttons productId={productData.id_product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
