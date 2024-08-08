"use client";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import ProductForm from "@/components/ProductForm";

function NewPage() {
  return (
    
    <AuthenticatedRoute allowedRoles={[1, 2]}> {/* Admin y Seller */}
      <div className="flex justify-center items-center h-full">
        <ProductForm />
      </div>
    </AuthenticatedRoute>
  );
}

export default NewPage;