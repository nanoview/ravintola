import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Reservation = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests?: string;
};

type ContactMessage = {
  id: string;
  created_at: string;
  name: string;
  subject: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
};

export default function DashboardPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"reservations" | "messages">("reservations");
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);
  const [viewedMessage, setViewedMessage] = useState<ContactMessage | null>(null);
  const pageSize = 10;

  // Reset page to 1 when switching tabs
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    // Log Supabase URL (do not log keys in production)
    // @ts-ignore
    //console.log('Supabase URL:', supabase?.restUrl || supabase?.url || 'Unknown');

    // Test connection by fetching 1 row from reservations
    supabase
      .from('reservations')
      .select('*')
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.log('Supabase test query error:', error.message, error);
        } else {
          console.log('Supabase test query success. Sample data:', data);
        }
      });
  }, []);

  const fetchReservations = async () => {
    const { data, error, count } = await supabase
      .from('reservations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      toast({
        title: "Error fetching reservations",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    return { data: data as Reservation[], count: count || 0 };
  };

  const fetchMessages = async () => {
    const { data, error, count } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    return { data: data as ContactMessage[], count: count || 0 };
  };

  const { data: reservationsData, isLoading: reservationsLoading, refetch: refetchReservations } = useQuery({
    queryKey: ['reservations', page],
    queryFn: fetchReservations,
    enabled: activeTab === 'reservations',
  });

  const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = useQuery({
    queryKey: ['messages', page],
    queryFn: fetchMessages,
    enabled: activeTab === 'messages',
  });

  const handleUpdateReservationStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating reservation",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reservation updated",
        description: `Reservation was ${status}.`,
      });
      refetchReservations();
    }
  };

  const handleMarkMessageAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'read' })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating message",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message marked as read",
      });
      refetchMessages();
    }
  };

  const handleMarkMessageAsUnread = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'unread' })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating message",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message marked as unread",
      });
      refetchMessages();
    }
  };

  // Open dialog and mark as read if needed
  const handleViewMessage = async (message: ContactMessage) => {
    setViewedMessage(message);
    setOpenMessageId(message.id);
    if (message.status === 'unread') {
      await handleMarkMessageAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Pagination helpers
  const reservationsTotalPages = reservationsData ? Math.ceil(reservationsData.count / pageSize) : 1;
  const messagesTotalPages = messagesData ? Math.ceil(messagesData.count / pageSize) : 1;

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "reservations" | "messages")}>
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations">
            <h2 className="text-2xl font-semibold mb-4">Manage Reservations</h2>
            {reservationsLoading ? (
              <div className="text-center py-10">Loading reservations...</div>
            ) : reservationsData?.data?.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-md">
                <p className="text-gray-500">No reservations found</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Special Requests</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservationsData?.data.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.date}</TableCell>
                          <TableCell>{reservation.time}</TableCell>
                          <TableCell>{reservation.name}</TableCell>
                          <TableCell>{reservation.guests}</TableCell>
                          <TableCell>
                            <div>{reservation.email}</div>
                            <div className="text-sm text-gray-500">{reservation.phone}</div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {reservation.special_requests || <span className="text-gray-400 italic">-</span>}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {reservation.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(reservation.id, 'confirmed')}
                                  className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                                >
                                  Confirm
                                </button>
                              )}
                              {reservation.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(reservation.id, 'cancelled')}
                                  className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {reservationsData && reservationsData.count > pageSize && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setPage(prev => Math.max(1, prev - 1))}
                          className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      {Array.from({ length: reservationsTotalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            onClick={() => setPage(i + 1)} 
                            isActive={page === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setPage(prev => Math.min(reservationsTotalPages, prev + 1))}
                          className={page === reservationsTotalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="messages">
            <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
            {messagesLoading ? (
              <div className="text-center py-10">Loading messages...</div>
            ) : messagesData?.data?.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-md">
                <p className="text-gray-500">No messages found</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messagesData?.data.map((message) => {
                        // If the dialog is open for this message, and it was just marked as unread, update the local viewedMessage status
                        const isViewed = openMessageId === message.id;
                        const status = isViewed && viewedMessage ? viewedMessage.status : message.status;
                        return (
                          <TableRow key={message.id}>
                            <TableCell>{formatDate(message.created_at)}</TableCell>
                            <TableCell>{message.name}</TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell>{message.email}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              <button
                                className="underline text-blue-600 hover:text-blue-800"
                                onClick={() => handleViewMessage(message)}
                              >
                                View
                              </button>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                status === 'read' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {status === 'read' ? 'Read' : 'Unread'}
                              </span>
                            </TableCell>
                            <TableCell>
                              {status === 'read' && (
                                <button
                                  onClick={() => handleMarkMessageAsUnread(message.id)}
                                  className="text-xs bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded"
                                >
                                  Mark as Unread
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                {messagesData && messagesData.count > pageSize && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setPage(prev => Math.max(1, prev - 1))}
                          className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      {Array.from({ length: messagesTotalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            onClick={() => setPage(i + 1)} 
                            isActive={page === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setPage(prev => Math.min(messagesTotalPages, prev + 1))}
                          className={page === messagesTotalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Message Dialog */}
        <Dialog open={!!openMessageId} onOpenChange={(open) => { if (!open) { setOpenMessageId(null); setViewedMessage(null); } }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewedMessage?.subject}</DialogTitle>
              <DialogDescription>
                <div className="mb-2 text-sm text-gray-500">
                  <span>{viewedMessage?.name}</span> &lt;{viewedMessage?.email}&gt; · {viewedMessage && formatDate(viewedMessage.created_at)}
                </div>
                <div className="whitespace-pre-line text-base text-gray-800">
                  {viewedMessage?.message}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
