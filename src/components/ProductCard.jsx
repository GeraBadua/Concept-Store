import Link from 'next/link';
import Image from 'next/image';

function ProductCard({ product, basePath }) {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      href={`${basePath}/${product.id_product}`}
    >
      {product.image && (
        <Image
          src={product.image}
          width={300} // Añadir el ancho adecuado
          height={300} // Añadir la altura adecuada
          className="w-full rounded-t-lg"
          alt={product.name}
        />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <h2 className="text-2xl text-slate-600">{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
