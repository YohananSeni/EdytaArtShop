import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <PayPalScriptProvider options={{ 
          'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
          currency: 'USD'
        }}>
          <App />
        </PayPalScriptProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);