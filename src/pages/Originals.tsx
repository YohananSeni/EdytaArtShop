import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import { getProductsByCategory } from '../services/api';
import { motion } from 'framer-motion';

const Originals: React.FC = () => {
  const [originals, setOriginals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    const fetchOriginals = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory('original');
        setOriginals(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching originals:', error);
        setLoading(false);
      }
    };
    
    fetchOriginals();
  }, []);
  
  // Sort originals based on selected option
  const sortedOriginals = [...originals].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Original Artwork
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Browse our collection of one-of-a-kind original artworks. Each piece is 
            hand-created by our artist, making your purchase truly unique.
          </p>
        </motion.div>
        
        {/* Filters & Sorting */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-neutral-300 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name: A to Z</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <ProductGrid products={sortedOriginals} loading={loading} />
      </div>
    </div>
  );
};

export default Originals;