import { Button } from '@/components/ui/button'; // Assuming you might want a button

interface Offer {
  id: string;
  name: string;
  description: string;
  old_price: string; // Consistent with OfferForm.tsx
  new_price: string; // Consistent with OfferForm.tsx
  start_date: string;
  end_date: string;
  // image_url?: string; // Optional: if you add images to offers
}

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Example: <img src={offer.image_url || 'default-placeholder.png'} alt={offer.name} className="w-full h-48 object-cover"/> */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">{offer.name}</h3>
        <p className="text-gray-600 mb-3 text-sm">{offer.description}</p>
        <div className="mb-4">
          {offer.old_price && <span className="text-gray-500 line-through mr-2">€{offer.old_price}</span>}
          <span className="text-xl font-bold text-green-600">€{offer.new_price}</span>
        </div>
        <p className="text-xs text-gray-500">
          Valid: {new Date(offer.start_date).toLocaleDateString()} - {new Date(offer.end_date).toLocaleDateString()}
        </p>
        {/* <Button asChild className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 w-full"><a href={`/offer/${offer.id}`}>View Details</a></Button> */}
      </div>
    </div>
  );
}