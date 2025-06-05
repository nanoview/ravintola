import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function OfferForm({ onOfferAdded }: { onOfferAdded: (offer: any) => void }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    old_price: '',
    new_price: '',
    start_date: '',
    end_date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) throw new Error('Käyttäjätunnusta ei löytynyt. Kirjaudu sisään uudelleen.');
      const user_id = userData.user.id;

      const insertData = {
        user_id,
        name: form.name,
        description: form.description,
        old_price: form.old_price ? parseFloat(form.old_price) : null,
        new_price: form.new_price ? parseFloat(form.new_price) : null,
        start_date: form.start_date,
        end_date: form.end_date
      };

      const { data, error } = await supabase
        .from('offers')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;

      onOfferAdded(data);
      setForm({
        name: '',
        description: '',
        old_price: '',
        new_price: '',
        start_date: '',
        end_date: ''
      });
    } catch (err: any) {
      setError(err.message || 'Error adding offer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-50 p-4 rounded shadow flex flex-col md:flex-row md:items-end gap-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tarjouksen nimi"
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Kuvaus"
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <input
        name="old_price"
        value={form.old_price}
        onChange={handleChange}
        placeholder="Old price"
        className="border rounded px-2 py-1 w-24"
        required
      />
      <input
        name="new_price"
        value={form.new_price}
        onChange={handleChange}
        placeholder="New price"
        className="border rounded px-2 py-1 w-24"
        required
      />
      <input
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        type="date"
        className="border rounded px-2 py-1 w-36"
        required
      />
      <input
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
        type="date"
        className="border rounded px-2 py-1 w-36"
        required
      />

      <button
        type="submit"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded shadow min-w-[100px]"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Offer'}
      </button>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
}
