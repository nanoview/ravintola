import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash, Calendar, Users, UtensilsCrossed, Mail } from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'messages'>('reservations');

  // Mock data for restaurant dashboard
  const recentReservations = [
    { id: 1, name: 'John Smith', guests: 4, date: '2025-05-10', time: '19:00' },
    { id: 2, name: 'Sarah Johnson', guests: 2, date: '2025-05-11', time: '20:00' },
    { id: 3, name: 'Michael Brown', guests: 6, date: '2025-05-12', time: '18:30' },
  ];

  const stats = [
    { title: 'Reservations Today', value: 12, icon: <Calendar className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Total Guests', value: 45, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Special Requests', value: 8, icon: <UtensilsCrossed className="h-4 w-4 text-muted-foreground" /> },
  ];

  // TODO: Replace mock data with real fetch from Supabase
  // Example fetch for contact messages (replace with your actual fetch logic)
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (activeTab === 'messages') {
      setLoadingMessages(true);
      import('@/integrations/supabase/client').then(({ supabase }) => {
        supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .then(({ data, error }) => {
            if (error) {
              setMessages([]);
              // Optionally show a toast or log error
              console.error('Error fetching messages:', error.message);
            } else {
              setMessages(data || []);
            }
            setLoadingMessages(false);
          });
      });
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="flex flex-col gap-4">
              <Button 
                variant={activeTab === 'reservations' ? 'default' : 'outline'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('reservations')}
              >
                <Calendar className="mr-2 h-4 w-4" /> Reservations
              </Button>
              <Button 
                variant={activeTab === 'messages' ? 'default' : 'outline'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('messages')}
              >
                <Mail className="mr-2 h-4 w-4" /> Contact Messages
              </Button>
            </nav>
          </CardContent>
        </Card>
      </div>
      {/* Main Content */}
      <div className="md:w-3/4 w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {activeTab === 'reservations' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Reservations</CardTitle>
              <CardDescription>Manage upcoming reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">{reservation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.guests} guests • {reservation.date} at {reservation.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {activeTab === 'messages' && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>View messages sent via the contact form</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div>Loading messages...</div>
              ) : messages.length === 0 ? (
                <div>No messages found.</div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="border-b pb-2">
                      <div className="font-medium">{msg.name} ({msg.email})</div>
                      <div className="text-sm text-muted-foreground">{msg.subject}</div>
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
