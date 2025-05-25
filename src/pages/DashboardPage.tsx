import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/Layout';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

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
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded shadow p-8 text-center">
          <p className="text-lg text-gray-700">Welcome to the admin dashboard.</p>
          <p className="text-gray-500 mt-2">(Fresh dashboard template. Add your management features here.)</p>
        </div>
      </div>
    </Layout>
  );
}
