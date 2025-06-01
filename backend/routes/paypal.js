import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import pool from '../config/database.js';

dotenv.config();

const router = express.Router();

// PayPal sandbox endpoints
const PAYPAL_API = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
const getPayPalAccessToken = async () => {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  try {
    const response = await axios({
      method: 'post',
      url: `${PAYPAL_API}/v1/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      },
      data: 'grant_type=client_credentials'
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw new Error('Failed to get PayPal access token');
  }
};

// Create PayPal payment
router.post('/create-payment', async (req, res) => {
  const { items, total } = req.body;
  
  if (!items || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await axios({
      method: 'post',
      url: `${PAYPAL_API}/v2/checkout/orders`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total.toString()
            },
            description: 'Art Print Shop Order'
          }
        ],
        application_context: {
          brand_name: 'Art Print Shop',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${req.protocol}://${req.get('host')}/payment-success`,
          cancel_url: `${req.protocol}://${req.get('host')}/payment-cancel`
        }
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    res.status(500).json({ error: 'Error creating PayPal payment' });
  }
});

// Execute PayPal payment
router.post('/execute-payment', async (req, res) => {
  const { orderId } = req.body;
  
  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId' });
  }
  
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await axios({
      method: 'post',
      url: `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const paypalData = response.data;
    
    // Update order status in database if payment successful
    if (paypalData.status === 'COMPLETED') {
      await pool.query(
        'UPDATE orders SET status = $1, paypal_transaction_id = $2 WHERE paypal_transaction_id = $3',
        ['completed', orderId, orderId]
      );
    }
    
    res.json(paypalData);
  } catch (error) {
    console.error('Error executing PayPal payment:', error);
    res.status(500).json({ error: 'Error executing PayPal payment' });
  }
});

export default router;