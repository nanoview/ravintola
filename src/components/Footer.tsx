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
           <p className="mb-2"> 02770 Espoo, Finland</p>
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
            <p className="mb-2">Maanantai - perjantai: klo 11.00–22.00</p>
            <p className="mb-2">Lauantai: klo 10.00–23.00</p>
            <p className="mb-2">Sunnuntai: klo 10.00–21.00</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">Pikalinkit</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Ruokalistamme</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Varaukset</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Tietoa meistä</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Ota yhteyttä</Link></li>
              <li></li>
            </ul>
        
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-primary transition-colors">
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
