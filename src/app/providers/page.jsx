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
      <h1 className="text-white text-center text-xl">Providers</h1>
      <ul>
        <Link href="/providers/new">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"> {/* Added ml-4 */}
            Add Provider
          </button>
        </Link>
      </ul>
      <br />
      <div className="grid gap-4 grid-cols-4">
        {providers.map(provider => (
          <ProviderCard key={provider.id_provider} provider={provider} basePath="/providers"/>
        ))}
      </div>
    </AuthenticatedRoute>
  );
}

export default ProvidersPage;
