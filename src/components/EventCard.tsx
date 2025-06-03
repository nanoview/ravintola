import { MapPinIcon, CalendarDaysIcon } from 'lucide-react'; // Or other suitable icons

interface Event {
  id: string;
  name: string;
  description: string;
  event_date: string;
  time?: string;
  location?: string;
  image_url?: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img src={event.image_url || 'https://source.unsplash.com/random/400x250/?event,party'} alt={event.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">{event.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <CalendarDaysIcon className="h-4 w-4 mr-2 text-blue-500" />
          {new Date(event.event_date).toLocaleDateString('fi-FI', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {event.time && ` - ${event.time}`}
        </div>
        {event.location && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" /> {event.location}
          </div>
        )}
        <p className="text-gray-700 text-sm mb-4">{event.description}</p>
        {/* <Button className="mt-auto bg-blue-600 hover:bg-blue-700 w-full">Learn More</Button> */}
      </div>
    </div>
  );
}