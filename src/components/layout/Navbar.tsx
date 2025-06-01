import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Palette } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Palette size={32} className="text-indigo-600" />
          <span className="text-xl font-serif font-medium">Art Print Shop</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium ${isActive ? 'text-indigo-600' : 'text-neutral-800 hover:text-indigo-600'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `font-medium ${isActive ? 'text-indigo-600' : 'text-neutral-800 hover:text-indigo-600'}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/prints" 
            className={({ isActive }) => 
              `font-medium ${isActive ? 'text-indigo-600' : 'text-neutral-800 hover:text-indigo-600'}`
            }
          >
            Prints
          </NavLink>
          <NavLink 
            to="/originals" 
            className={({ isActive }) => 
              `font-medium ${isActive ? 'text-indigo-600' : 'text-neutral-800 hover:text-indigo-600'}`
            }
          >
            Originals
          </NavLink>
          <NavLink 
            to="/workshops" 
            className={({ isActive }) => 
              `font-medium ${isActive ? 'text-indigo-600' : 'text-neutral-800 hover:text-indigo-600'}`
            }
          >
            Workshops
          </NavLink>
        </nav>
        
        {/* Cart & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/cart" 
            className="relative p-2 text-neutral-800 hover:text-indigo-600 transition-colors"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            className="md:hidden p-2 text-neutral-800 hover:text-indigo-600 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-20 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-6 text-center">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                to="/prints" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Prints
              </NavLink>
              <NavLink 
                to="/originals" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Originals
              </NavLink>
              <NavLink 
                to="/workshops" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Workshops
              </NavLink>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => 
                  `text-2xl font-medium py-2 ${isActive ? 'text-indigo-600' : 'text-neutral-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;