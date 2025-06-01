import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const { items, total } = state;
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h1>
        
        {items.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-neutral-300" />
            </div>
            <h2 className="text-2xl font-medium text-neutral-700 mb-4">Your cart is empty</h2>
            <p className="text-neutral-500 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prints" className="btn btn-primary">
                Browse Prints
              </Link>
              <Link to="/workshops" className="btn btn-secondary">
                Explore Workshops
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem 
                    key={`${item.type}-${item.id}`}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    image_url={item.type === 'product' ? item.image_url : undefined}
                    type={item.type}
                    event_date={item.type === 'event' ? item.event_date : undefined}
                  />
                ))}
              </AnimatePresence>
              
              <div className="mt-6">
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 my-4 pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="btn btn-primary w-full flex items-center justify-center gap-2 mt-6"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </Link>
                
                <div className="mt-4 text-center">
                  <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-sm">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;