import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  price: number;
  image_url: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[4/5] bg-neutral-200 rounded-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-neutral-600">No products found</h3>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard
            id={product.id}
            title={product.title}
            price={product.price}
            image_url={product.image_url}
            category={product.category}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;