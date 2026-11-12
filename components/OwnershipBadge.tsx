
import { ShieldCheck } from "lucide-react";

export function OwnershipBadge({ owner }: { owner: "Sold by Fast Group" | "Marketplace Seller" }) {
  if (owner === "Marketplace Seller") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
        <ShieldCheck size={13} className="text-amber-600" />
        Marketplace Seller
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-200/60 bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800">
      <ShieldCheck size={13} className="text-teal-600" />
      Sold by Fast Group
    </span>
  );
}
