import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image_url: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image_url, category }) => {
  return (
    <motion.div 
      className="card h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${id}`} className="block h-full">
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg text-neutral-900 line-clamp-1">{title}</h3>
            <span className="text-indigo-600 font-medium">${price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-neutral-500 capitalize mt-1">{category}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;