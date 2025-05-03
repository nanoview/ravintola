
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Savoria Bistro</h3>
            <p className="mb-2">123 Gourmet Avenue</p>
            <p className="mb-2">Culinary District</p>
            <p className="mb-2">Foodville, FL 34567</p>
            <p className="mb-4">(123) 456-7890</p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <p className="mb-2">Monday - Friday: 11am - 10pm</p>
            <p className="mb-2">Saturday: 10am - 11pm</p>
            <p className="mb-2">Sunday: 10am - 9pm</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Reservations</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Savoria Bistro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
