import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import ProviderCard from "@/components/ProviderCard";
import conn from '@/libs/mysql';
import Link from 'next/link';

async function loadProviders() {
  const [providers] = await conn.query('SELECT * FROM provider');
  return providers;
}

export const dynamic = 'force-dynamic';

async function ProvidersPage() {
  const providers = await loadProviders();

  return (
    <AuthenticatedRoute allowedRoles={[1]}> {/* Solo para admin */}
      <h1 className="text-white text-center text-xl">Administrar Proveedores</h1>
      <br />
      <br />
      <br />
      <ul>
          <li>
            <Link href="/providers/new" className="text-sky-500 hover:text-sky-400">
              New Provider
            </Link>
          </li>
      </ul>
      <div className="grid gap-4 grid-cols-4">
        {providers.map(provider => (
          <ProviderCard key={provider.id_provider} provider={provider} basePath="/providers"/>
        ))}
      </div>
    </AuthenticatedRoute>
  );
}

export default ProvidersPage;
