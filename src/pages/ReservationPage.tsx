import { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

export default function ReservationPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    time: '',
    specialRequests: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReservationData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTimeChange = (value: string) => {
    setReservationData(prev => ({ ...prev, time: value }));
  };

  const handleGuestsChange = (value: string) => {
    setReservationData(prev => ({ ...prev, guests: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Valitse päivämäärä",
        description: "Varauksen päivämäärä vaaditaan.",
        variant: "destructive"
      });
      return;
    }
    
    if (!reservationData.time) {
      toast({
        title: "Valitse aika",
        description: "Varausaika vaaditaan.",
        variant: "destructive"
      });
      return;
    }
    
    const formattedDate = format(date, 'yyyy-MM-dd');

    setLoading(true);

    try {
      // Save reservation to Supabase
      const { error } = await supabase
        .from('reservations')
        .insert([
          {
            name: reservationData.name,
            email: reservationData.email,
            phone: reservationData.phone,
            guests: reservationData.guests,
            date: formattedDate,
            time: reservationData.time,
            special_requests: reservationData.specialRequests,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // Call edge function to send notification email
      const { error: notificationError } = await supabase.functions.invoke('send-reservation-notification', {
        body: {
          name: reservationData.name,
          email: reservationData.email,
          phone: reservationData.phone,
          guests: reservationData.guests,
          date: formattedDate,
          time: reservationData.time,
          specialRequests: reservationData.specialRequests
        }
      });

      if (notificationError) {
        console.error("Error sending notification:", notificationError);
      }

      toast({
        title: "Varauspyyntö lähetetty!",
        description: "Vahvistamme varauksesi pian sähköpostitse.",
      });
      
      // Reset form
      setReservationData({
        name: '',
        email: '',
        phone: '',
        guests: '2',
        time: '',
        specialRequests: ''
      });
      setDate(undefined);
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast({
        title: "Virhe varauksen lähettämisessä",
        description: "Varauksesi lähettämisessä oli ongelma. Lähetä sähköpostitse tai soita numeron +358 45 116 9090. Pahoittelemme ongelmasta.",

        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
    "14:00", "17:00", "17:30", "18:00", "18:30", "19:00", 
    "19:30", "20:00", "20:30", "21:00"
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Varaa pöytä</h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Varaa pöytä Savoria Bistroon ja nauti unohtumattomasta ruokailukokemuksesta.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Varauslomake (3 saraketta) */}
            <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Varauksen tiedot</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Koko nimi</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={reservationData.name} 
                      onChange={handleChange}
                      placeholder="Esim. Matti Meikäläinen" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Sähköpostiosoite</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={reservationData.email} 
                      onChange={handleChange}
                      placeholder="esim. matti@email.com" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Puhelinnumero</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={reservationData.phone} 
                      onChange={handleChange}
                      placeholder="esim. 040 123 4567" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Vieraiden määrä</Label>
                    <Select value={reservationData.guests} onValueChange={handleGuestsChange}>
                      <SelectTrigger id="guests">
                        <SelectValue placeholder="Valitse vieraiden määrä" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'vieras' : 'vierasta'}
                          </SelectItem>
                        ))}
                        <SelectItem value="11+">11+ vierasta (suuri seurue)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Päivämäärä</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Valitse päivämäärä</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            // Estä menneet päivät
                            return date < new Date(new Date().setHours(0, 0, 0, 0));
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Aika</Label>
                    <Select value={reservationData.time} onValueChange={handleTimeChange}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Valitse aika" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Erityispyynnöt (valinnainen)</Label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={reservationData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full min-h-[80px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Erityisvaatimukset tai toiveet?"
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Käsitellään...' : 'Lähetä varaustietosi'}
                </Button>
              </form>
            </div>
            {/* Info-paneeli (2 saraketta) */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Varaustiedot</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-0.5" size={18} />
                    <span>Varauksia voi tehdä jopa 30 päivää etukäteen.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-0.5" size={18} />
                    <span>Yli 10 hengen seurueille soitathan meille suoraan.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-0.5" size={18} />
                    <span>Pidämme varattua pöytää 15 minuuttia varausajan jälkeen.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mr-3 mt-0.5" size={18} />
                    <span>Luottokorttia ei tarvita varauksen tekemiseen.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Erikoistapahtumat</h3>
                <p className="mb-4">
                  Suunnitteletko erityistä tilaisuutta? Tarjoamme yksityistilaisuuksia ja räätälöityjä menuja:
                </p>
                <ul className="space-y-2 mb-4">
                  <li>- Yritystapahtumat</li>
                  <li>- Hääharjoitukset</li>
                  <li>- Syntymäpäiväjuhlat</li>
                  <li>- Vuosipäiväillalliset</li>
                </ul>
                <p className="italic">
                  Ota yhteyttä tapahtumatiimiimme osoitteessa events@savoriabistro.com saadaksesi lisätietoja.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-muted bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">Tarvitsetko apua?</h3>
                <p className="mb-2">
                  Jos tarvitset välitöntä apua tai haluat tehdä viime hetken varauksia, voit soittaa meille tai lähettää sähköpostia:
                </p>
                <p className="text-lg font-medium">+358 45 116 9090</p>
                <p className="text-lg font-medium">afrin.aloron@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
