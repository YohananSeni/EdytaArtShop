import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { createPayPalPayment, executePayPalPayment, createOrder } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface PayPalCheckoutProps {
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ customerInfo }) => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  
  const createPayPalOrder = async () => {
    try {
      // Format items for PayPal
      const paymentData = {
        items: state.items.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        total: state.total
      };
      
      // Create PayPal order
      const response = await createPayPalPayment(paymentData);
      return response.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  };
  
  const onApprove = async (data: any) => {
    try {
      // Execute PayPal payment
      const response = await executePayPalPayment(data.orderID);
      
      if (response.status === 'COMPLETED') {
        // Format order items for database
        const orderItems = state.items.map(item => ({
          product_id: item.type === 'product' ? item.id : null,
          event_id: item.type === 'event' ? item.id : null,
          quantity: item.quantity,
          unit_price: item.price
        }));
        
        // Create order in database
        const orderResponse = await createOrder({
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          total_amount: state.total,
          paypal_transaction_id: data.orderID,
          shipping_address: customerInfo.address,
          items: orderItems
        });
        
        // Clear cart and redirect to confirmation page
        clearCart();
        navigate(`/order-confirmation/${orderResponse.order_id}`);
      }
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      alert('There was a problem with your payment. Please try again.');
    }
  };
  
  return (
    <div className="w-full">
      <PayPalButtons
        createOrder={createPayPalOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical', shape: 'rect' }}
      />
    </div>
  );
};

export default PayPalCheckout;