import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';

interface LayoutProps {
  children: ReactNode;
  darkHeader?: boolean;
}

export default function Layout({ children, darkHeader = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar darkHeader={darkHeader} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
