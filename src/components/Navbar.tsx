
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  darkHeader?: boolean;
}

export default function Navbar({ darkHeader }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = isScrolled || !darkHeader
    ? "bg-white shadow-md text-foreground fixed w-full z-50"
    : "bg-transparent text-purple fixed w-full z-50";

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-primary mr-1 text-fuchsia-500">RAVINTOLA</span>
            <span className={isScrolled || !darkHeader ? "text-purple" : "text-foreground"}>MUMMUNTUPA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition-colors font-medium" style={{ color: isScrolled || !darkHeader ? 'inherit' : 'fuchsia' }}>KOTI</Link>
            <Link to="/menu" className="hover:text-primary transition-colors font-medium">RUOKALISTA</Link>
            <Link to="/about" className="hover:text-primary transition-colors font-medium">TIETOA MEISTA</Link>
            <Link to="/contact" className="hover:text-primary transition-colors font-medium">OTA YHTEYTTÄ</Link>
            <Button asChild>
              <Link to="/reservation">VARAA PÖYTÄ</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white text-foreground py-4 px-2 absolute top-20 left-0 right-0 shadow-md z-50">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-primary transition-colors px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="hover:text-primary transition-colors px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className="hover:text-primary transition-colors px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-primary transition-colors px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-2">
                <Button asChild className="w-full">
                  <Link 
                    to="/reservation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reserve a Table
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
