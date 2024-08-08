import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import Buttons from "./Buttons";
import conn from "@/libs/mysql";
import Image from "next/image";

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
    
   
    <section className="flex justify-center items-center h-auto pt-20"> 
    <br></br>
    <br></br>
    <AuthenticatedRoute allowedRoles={[2]}> {/* Only admin */}
      <div className="flex w-4/6 h-auto justify-center border-rounded bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 text-center flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold mb-3">{productData.name}</h3>
          <h4 className="text-4xl font-bold">${productData.price}</h4>
          <p className="text-slate-700">{productData.description}</p>
          <Buttons productId={productData.id_product} />
         </div>
      {productData.image && (
        <Image
            src={productData.image}
            width={300} // Añadir el ancho adecuado
            height={300} // Añadir la altura adecuada
            className="w-1/3"
            alt={productData.name}
          />
        )}
      </div>
      </AuthenticatedRoute>
    </section>
    
  );
}

export default ProductPage;
