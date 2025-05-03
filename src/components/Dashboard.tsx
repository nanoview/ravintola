
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, FileText, Trash, Calendar, Users, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
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
            <Button variant="outline" className="w-full mt-4">
              View All Reservations
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Special Request</CardTitle>
            <CardDescription>Add a special note for the kitchen</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Table Number"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <textarea
                  placeholder="Special request or dietary requirements..."
                  className="w-full p-2 border rounded-md h-32 resize-none"
                ></textarea>
              </div>
              <Button>Send to Kitchen</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
