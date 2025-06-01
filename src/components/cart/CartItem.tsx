import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string;
  type: 'product' | 'event';
  event_date?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  quantity,
  image_url,
  type,
  event_date
}) => {
  const { removeItem, updateQuantity } = useCart();
  
  const handleRemove = () => {
    removeItem(id, type);
  };
  
  const handleIncrement = () => {
    updateQuantity(id, type, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, type, quantity - 1);
    }
  };
  
  // Format date if it's an event
  const formattedDate = event_date 
    ? new Date(event_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    : null;
  
  return (
    <motion.div 
      className="flex border-b border-neutral-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image or placeholder */}
      <div className="w-24 h-24 flex-shrink-0 bg-neutral-100 rounded overflow-hidden mr-4">
        {image_url ? (
          <img src={image_url} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600">
            <span className="text-xs text-center px-2">
              {type === 'event' ? 'Workshop' : 'Product'}
            </span>
          </div>
        )}
      </div>
      
      {/* Item details */}
      <div className="flex-grow">
        <h3 className="text-neutral-900 font-medium">{title}</h3>
        {formattedDate && (
          <p className="text-neutral-500 text-sm">{formattedDate}</p>
        )}
        <p className="text-indigo-600 font-medium mt-1">${price.toFixed(2)}</p>
      </div>
      
      {/* Quantity controls */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center border border-neutral-200 rounded">
          <button 
            onClick={handleDecrement}
            className="px-2 py-1 text-neutral-600 hover:text-indigo-600 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="px-2 py-1 text-neutral-600 hover:text-indigo-600"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-neutral-400 hover:text-red-500 p-1"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;