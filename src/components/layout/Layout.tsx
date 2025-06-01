import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Update document title based on current route
  useEffect(() => {
    const formatTitle = (path: string) => {
      if (path === '/') return 'Home | Art Print Shop';
      const formatted = path.slice(1).split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      return `${formatted} | Art Print Shop`;
    };
    
    document.title = formatTitle(pathname);
  }, [pathname]);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Page transition variants
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrolled={scrolled} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;