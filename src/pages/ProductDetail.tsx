import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getProductById(parseInt(id));
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        quantity: quantity,
        type: 'product'
      });
      
      // Reset quantity
      setQuantity(1);
      
      // Show confirmation toast/notification
      alert(`${product.title} added to cart!`);
    }
  };
  
  if (loading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="mb-8">
              <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-square bg-neutral-200 rounded"></div>
              
              <div>
                <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
                
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-6"></div>
                
                <div className="h-12 bg-neutral-200 rounded mb-4"></div>
                <div className="h-12 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link to="/prints" className="btn btn-primary">
            Back to Prints
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to={`/${product.category === 'print' ? 'prints' : 'originals'}`} className="text-neutral-600 hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Back to {product.category === 'print' ? 'Prints' : 'Originals'}</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square bg-neutral-100 rounded-lg overflow-hidden"
          >
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-serif font-medium text-neutral-900 mb-2">
              {product.title}
            </h1>
            <p className="text-2xl text-indigo-600 font-medium mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-neutral-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Quantity</h2>
              <div className="flex items-center border border-neutral-300 rounded-md inline-flex">
                <button 
                  onClick={handleDecrement}
                  className="px-3 py-2 text-neutral-600 hover:text-indigo-600 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x border-neutral-300">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="px-3 py-2 text-neutral-600 hover:text-indigo-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={product.stock_quantity < 1}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
              
              {product.stock_quantity < 1 && (
                <p className="text-red-600 text-center">Out of stock</p>
              )}
              
              {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                <p className="text-amber-600 text-center">
                  Only {product.stock_quantity} left in stock
                </p>
              )}
            </div>
            
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <h2 className="text-lg font-medium mb-2">Details</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <span className="font-medium">Type:</span> {product.category === 'print' ? 'Art Print' : 'Original Artwork'}
                </li>
                {product.category === 'print' && (
                  <>
                    <li>
                      <span className="font-medium">Paper:</span> Archival, acid-free fine art paper
                    </li>
                    <li>
                      <span className="font-medium">Print:</span> Giclée print with archival inks
                    </li>
                  </>
                )}
                {product.category === 'original' && (
                  <>
                    <li>
                      <span className="font-medium">Medium:</span> Mixed media on canvas
                    </li>
                    <li>
                      <span className="font-medium">Signed:</span> Hand-signed by the artist
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;