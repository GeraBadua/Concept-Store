import Link from 'next/link';

function ProviderCard({ provider, basePath }) {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      href={`${basePath}/${provider.id_provider}`}
    >
      <div className="p-4">
        <h1 className="text-lg font-bold">{provider.name}</h1>
        <p>{provider.address}</p>
        <p>{provider.phone}</p>
        <p>{provider.email}</p>
      </div>
    </Link>
  );
}

export default ProviderCard;
