
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Ravintola Mummuntupa</h3>
            <p className="mb-2">Vieraskuja 4 (2 krs)   </p>
           <p className="mb-2"> 02770  Espoo, Finland</p>
            <p className="mb-4">+358 45 116 9090</p>
             {/* Google Maps Link */}
             <a
              href="https://www.google.com/maps?q=Vieraskuja+4,+02770+Espoo,+Finland"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-fuchsia-500 hover:text-primary transition-colors"
            >
              <MapPin size={20} className="mr-2" />
              View on Google Maps
            </a>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Aukioloajat</h3>
            <p className="mb-2">Maanantai - perjantai: klo 11.00 - 22.00</p>
            <p className="mb-2">Lauantai: klo 10–23</p>
            <p className="mb-2">Sunnuntai: klo 10–21</p>
          
            <h3 className="text-xl font-bold mb-4 text-green-500">Opening Hours</h3>
            <p className="mb-2">Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p className="mb-2">Saturday: 10am - 11pm</p>
            <p className="mb-2">Sunday: 10am - 9pm</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Pikalinkit</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-primary transition-colors">Ruokalistamme</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Varaukset</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Tietoa meistä</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Ota yhteyttä</Link></li>
              <li></li>
            </ul>
            <h3 className="text-xl font-bold mb-4 text-green-500">Quicklinks</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-primary transition-colors">Our menu</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Reservation</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p className="text-green-500">&copy; {new Date().getFullYear()} Ravintola Mummuntupa.</p> 
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
