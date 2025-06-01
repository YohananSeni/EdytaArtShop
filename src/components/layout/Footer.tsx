import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Palette } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Palette size={32} className="text-indigo-400" />
              <span className="text-xl font-serif font-medium">Art Print Shop</span>
            </div>
            <p className="text-neutral-400 mb-4 max-w-md">
              We bring art into everyday life through high-quality prints, 
              original artworks, and immersive workshops. Our passion is making art 
              accessible and inspiring to all.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@artprintshop.com" className="text-neutral-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/prints" className="text-neutral-400 hover:text-white transition-colors">
                  Art Prints
                </Link>
              </li>
              <li>
                <Link to="/originals" className="text-neutral-400 hover:text-white transition-colors">
                  Original Artwork
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="text-neutral-400 hover:text-white transition-colors">
                  Workshops & Events
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Info Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About the Artist
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-neutral-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Art Print Shop. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Payment methods: PayPal, Credit Card
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;