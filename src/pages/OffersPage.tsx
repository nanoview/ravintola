import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import OfferCard from '@/components/OfferCard';
import Layout from '@/components/Layout';

interface Offer {
  id: string;
  user_id: string;
  name: string;
  description: string;
  old_price: string;
  new_price: string;
  start_date: string;
  end_date: string;
  // image_url?: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActiveOffers() {
      setLoading(true);
      setError(null);
      const now = new Date().toISOString();
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) throw new Error('Käyttäjätunnusta ei löytynyt. Kirjaudu sisään uudelleen.');
        const user_id = userData.user.id;
        const { data, error: dbError } = await supabase
          .from('offers')
          .select('*')
          .eq('user_id', user_id)
          .lte('start_date', now) // Offer has started or is starting now
          .gte('end_date', now)   // Offer has not ended yet
          .order('end_date', { ascending: true });

        if (dbError) throw dbError;
        setOffers(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch offers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActiveOffers();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-fuchsia-600">Our Special Offers</h1>
        {loading && <p className="text-center text-lg">Loading offers...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
        {!loading && !error && offers.length === 0 && (
          <p className="text-center text-gray-600 text-lg">No active offers at the moment. Check back soon!</p>
        )}
        {!loading && !error && offers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}