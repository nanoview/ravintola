import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function OfferPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      setLoading(true);
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .gte('start_date', now)
        .lte('end_date', now)
        .order('end_date', { ascending: true });
      setOffers(data || []);
      setLoading(false);
    }
    fetchOffers();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-10 text-yellow-700">Erikoistarjoukset</h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-yellow-800">
          Tartu viikon parhaisiin tarjouksiin! Alla löydät alennetut annokset rajoitetuksi ajaksi.
        </p>
        {loading ? (
          <div className="text-center py-10">Ladataan tarjouksia...</div>
        ) : offers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Ei voimassa olevia tarjouksia.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map(item => (
              <Card key={item.id} className="overflow-hidden border-yellow-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-900">{item.name}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="line-through text-gray-400">{item.old_price}</span>
                    <span className="text-yellow-700 font-bold text-lg">{item.new_price}</span>
                  </div>
                  <div className="text-xs text-gray-500">Voimassa: {item.start_date?.slice(0,10)} - {item.end_date?.slice(0,10)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/menu" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Takaisin ruokalistaan
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
