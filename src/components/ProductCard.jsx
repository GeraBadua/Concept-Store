import Link from "next/link";

function ProductCard({ product }) {
  const priceValue = Number(product.price);
  const formattedPrice = Number.isFinite(priceValue)
    ? `$${priceValue.toFixed(2)}`
    : product.price;

  return (
    <Link
      className="group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-slate-600"
      href={`/products/${product.id_product}`}
    >
      <div className="relative aspect-[4/3] bg-slate-800/70">
        {product.image ? (
          <img
            src={product.image}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            alt={product.name}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-300">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-semibold text-white">{product.name}</h1>
          <span className="text-sm font-semibold text-emerald-300">
            {formattedPrice}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          {product.description}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
