import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getOrderById } from '../services/api';
import { motion } from 'framer-motion';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const data = await getOrderById(parseInt(orderId));
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse max-w-2xl mx-auto">
            <div className="h-10 bg-neutral-200 rounded w-3/4 mx-auto mb-8"></div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
              <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-6"></div>
              
              <div className="h-24 bg-neutral-200 rounded mb-6"></div>
              
              <div className="h-10 bg-neutral-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Order Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-neutral-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
            <h2 className="text-xl font-medium mb-4">Order Details</h2>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-neutral-700">
                <span>Order Number:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Date:</span>
                <span>
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Total:</span>
                <span className="font-medium">${parseFloat(order.total_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Status:</span>
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Items</h3>
              
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {item.product_title || item.event_title}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${parseFloat(item.unit_price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-neutral-600 mb-6">
                A confirmation email has been sent to {order.customer_email}.
              </p>
              
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;