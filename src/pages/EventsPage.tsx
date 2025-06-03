import { useState, useEffect } from 'react';
// Update the import path below to the correct relative path if needed
// Update the import path below to the correct relative path if needed
import { supabase } from '@/integrations/supabase/client';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';

interface Event {
  id: string;
  name: string;
  description: string;
  event_date: string;
  time?: string;
  location?: string;
  image_url?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUpcomingEvents() {
      setLoading(true);
      setError(null);
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      try {
        const { data, error: dbError } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true) // Only show active events
          .gte('event_date', today) // Events from today onwards
          .order('event_date', { ascending: true });

        if (dbError) throw dbError;
        setEvents(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch events.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUpcomingEvents();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-600">Upcoming Events</h1>
        {loading && <p className="text-center text-lg">Loading events...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-600 text-lg">No upcoming events scheduled. Please check back later!</p>
        )}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}