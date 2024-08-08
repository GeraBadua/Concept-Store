import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import ProviderForm from "@/components/ProviderForm";
import conn from "@/libs/mysql";

async function loadProvider(providerId) {
  const [data] = await conn.query('SELECT * FROM provider WHERE id_provider = ?', [providerId]);
  return data;
}

async function ProviderPage({ params }) {
  const provider = await loadProvider(params.id_provider);

  if (!provider || provider.length === 0) {
    return <p>Proveedor no encontrado</p>;
  }

  const providerData = provider[0];

  return (
    <AuthenticatedRoute allowedRoles={[1]}> {/* Solo para admin */}
      <section className="flex justify-center items-center h-auto pt-20">
        <ProviderForm provider={providerData} />
      </section>
    </AuthenticatedRoute>
  );
}

export default ProviderPage;
