"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-400"
        onClick={() => {
          router.push("/products");
        }}
      >
        Back
      </button>
      <button
        className="rounded-full border border-amber-500/70 px-4 py-2 text-sm text-amber-200 transition hover:border-amber-400"
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}
      >
        Edit
      </button>
      <button
        className="rounded-full border border-red-500/80 px-4 py-2 text-sm text-red-200 transition hover:border-red-400"
        onClick={async () => {
          if (confirm("are you sure you want to delete this prodcut?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status === 200 || res.data?.success) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Buttons;
