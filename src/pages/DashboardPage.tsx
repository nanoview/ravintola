import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/Layout';
import OfferForm from '../components/OfferForm';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'reservation' | 'messages' | 'offers'>('reservation');

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        if (data?.session && data.session.user) {
          setAuthenticated(true);
        } else {
          window.location.replace('/login');
        }
        setLoading(false);
      }
    }
    checkAuth();
    return () => { isMounted = false; };
  }, []);

  // Reservation content from Supabase
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(false);
  useEffect(() => {
    if (activeTab === 'reservation') {
      setReservationsLoading(true);
      supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          setReservations(data || []);
          setReservationsLoading(false);
        });
    }
  }, [activeTab]);

  // Messages content from Supabase
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  useEffect(() => {
    if (activeTab === 'messages') {
      setMessagesLoading(true);
      supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          setMessages(data || []);
          setMessagesLoading(false);
        });
    }
  }, [activeTab]);

  // Offers content from Supabase
  const [offers, setOffers] = useState<any[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersReload, setOffersReload] = useState(0);
  const [editingOffer, setEditingOffer] = useState<any | null>(null);
  useEffect(() => {
    if (activeTab === 'offers') {
      setOffersLoading(true);
      supabase
        .from('offers')
        .select('*')
        .order('end_date', { ascending: true })
        .then(({ data }) => {
          setOffers(data || []);
          setOffersLoading(false);
        });
    }
  }, [activeTab, offersReload]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (!authenticated) {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-2 md:px-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-56 md:mr-8 mb-4 md:mb-0">
          <nav className="bg-white rounded shadow p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button
              className={`flex-1 text-left px-4 py-2 rounded font-medium transition-colors ${activeTab === 'reservation' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('reservation')}
            >
              Reservation
            </button>
            <button
              className={`flex-1 text-left px-4 py-2 rounded font-medium transition-colors ${activeTab === 'messages' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </button>
            <button
              className={`flex-1 text-left px-4 py-2 rounded font-medium transition-colors ${activeTab === 'offers' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('offers')}
            >
              Offers
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow font-semibold"
          >
            Logout
          </button>
        </div>
        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="bg-white rounded shadow p-4 md:p-8 overflow-x-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Restaurant Dashboard</h1>
            <div className="mt-4 md:mt-8">
              {activeTab === 'reservation' && (
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Reservations</h2>
                  {reservationsLoading ? (
                    <div>Loading reservations...</div>
                  ) : reservations.length === 0 ? (
                    <div className="text-gray-500">No reservations found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-[600px] w-full text-left border text-xs md:text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2">Date</th>
                            <th className="p-2">Time</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Guests</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map(r => (
                            <tr key={r.id} className="border-t">
                              <td className="p-2">{r.date}</td>
                              <td className="p-2">{r.time}</td>
                              <td className="p-2">{r.name}</td>
                              <td className="p-2">{r.guests}</td>
                              <td className="p-2">{r.email}</td>
                              <td className="p-2">{r.phone}</td>
                              <td className="p-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  r.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {r.status ? r.status.charAt(0).toUpperCase() + r.status.slice(1) : 'Pending'}
                                </span>
                              </td>
                              <td className="p-2">
                                {r.status !== 'confirmed' && (
                                  <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs mr-2"
                                    onClick={async () => {
                                      await supabase.from('reservations').update({ status: 'confirmed' }).eq('id', r.id);
                                      setReservations(reservations => reservations.map(res => res.id === r.id ? { ...res, status: 'confirmed' } : res));
                                    }}
                                  >
                                    Confirm
                                  </button>
                                )}
                                {r.status !== 'cancelled' && (
                                  <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                    onClick={async () => {
                                      await supabase.from('reservations').update({ status: 'cancelled' }).eq('id', r.id);
                                      setReservations(reservations => reservations.map(res => res.id === r.id ? { ...res, status: 'cancelled' } : res));
                                    }}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Messages</h2>
                  {messagesLoading ? (
                    <div>Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-gray-500">No messages found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-[600px] w-full text-left border text-xs md:text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2">Date</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Subject</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messages.map(m => (
                            <tr key={m.id} className="border-t">
                              <td className="p-2">{new Date(m.created_at).toLocaleDateString('fi-FI')}</td>
                              <td className="p-2">{m.name}</td>
                              <td className="p-2">{m.subject}</td>
                              <td className="p-2">{m.email}</td>
                              <td className="p-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  m.status === 'read' ? 'bg-green-100 text-green-700' :
                                  m.status === 'replied' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {m.status ? m.status.charAt(0).toUpperCase() + m.status.slice(1) : 'Unread'}
                                </span>
                              </td>
                              <td className="p-2">
                                <button
                                  className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-2 py-1 rounded text-xs mr-2"
                                  onClick={async () => {
                                    if (m.status !== 'read') {
                                      await supabase.from('contact_messages').update({ status: 'read' }).eq('id', m.id);
                                      setMessages(messages => messages.map(msg => msg.id === m.id ? { ...msg, status: 'read' } : msg));
                                    }
                                    alert(`Message from ${m.name}:\n\n${m.message}`);
                                  }}
                                >
                                  Open
                                </button>
                                <button
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs mr-2"
                                  onClick={async () => {
                                    await supabase.from('contact_messages').update({ status: 'unread' }).eq('id', m.id);
                                    setMessages(messages => messages.map(msg => msg.id === m.id ? { ...msg, status: 'unread' } : msg));
                                  }}
                                >
                                  Unread
                                </button>
                                <button
                                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                  onClick={async () => {
                                    if (window.confirm('Are you sure you want to delete this message?')) {
                                      await supabase.from('contact_messages').delete().eq('id', m.id);
                                      setMessages(messages => messages.filter(msg => msg.id !== m.id));
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'offers' && (
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Tarjoukset</h2>
                  <OfferForm
                    onOfferAdded={offer => {
                      setEditingOffer(null);
                      setOffersReload(r => r + 1);
                    }}
                    editingOffer={editingOffer}
                    onCancelEdit={() => setEditingOffer(null)}
                  />
                  {offersLoading ? (
                    <div>Loading offers...</div>
                  ) : offers.length === 0 ? (
                    <div className="text-gray-500">No offers found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-[600px] w-full text-left border text-xs md:text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2">Nimi</th>
                            <th className="p-2">Kuvaus</th>
                            <th className="p-2">Vanha hinta</th>
                            <th className="p-2">Uusi hinta</th>
                            <th className="p-2">Voimassa</th>
                            <th className="p-2">Toiminnot</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offers.map(o => (
                            <tr key={o.id} className="border-t">
                              <td className="p-2">{o.name}</td>
                              <td className="p-2">{o.description}</td>
                              <td className="p-2 line-through">{o.old_price}</td>
                              <td className="p-2 font-bold text-yellow-700">{o.new_price}</td>
                              <td className="p-2 text-xs text-gray-500">{o.start_date?.slice(0,10)} - {o.end_date?.slice(0,10)}</td>
                              <td className="p-2 flex gap-2">
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                  onClick={() => setEditingOffer(o)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                  onClick={async () => {
                                    if (window.confirm('Are you sure you want to delete this offer?')) {
                                      await supabase.from('offers').delete().eq('id', o.id);
                                      setOffersReload(r => r + 1);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
