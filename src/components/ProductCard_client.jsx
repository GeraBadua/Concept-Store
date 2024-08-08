import Link from "next/link";

function ProductCard_client({ product }) {
  return (
    <Link
      className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden mb-3 hover:bg-gray-100 transition-transform transform hover:scale-105 hover:cursor-pointer"
      href={`/products_client/${product.id_product}`}
    >
      <div className="flex flex-col h-full">
        {product.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={product.image}
              className="object-cover w-full h-full transition-transform transform hover:scale-105"
              alt={product.name}
            />
          </div>
        )}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800 truncate">
              {product.name}
            </h1>
            <h2 className="text-2xl text-slate-600 font-semibold mt-2">
              ${product.price}
            </h2>
          </div>
          <p className="text-gray-600 mt-2 line-clamp-3">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard_client;