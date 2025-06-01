import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const {
    customer_email,
    customer_name,
    total_amount,
    paypal_transaction_id,
    shipping_address,
    items
  } = req.body;
  
  if (!customer_email || !customer_name || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders 
       (customer_email, customer_name, total_amount, paypal_transaction_id, shipping_address, status) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id`,
      [customer_email, customer_name, total_amount, paypal_transaction_id, shipping_address, 'pending']
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Add order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items 
         (order_id, product_id, event_id, quantity, unit_price) 
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id || null, item.event_id || null, item.quantity, item.unit_price]
      );
      
      // Update stock if it's a product
      if (item.product_id) {
        await client.query(
          `UPDATE products 
           SET stock_quantity = stock_quantity - $1 
           WHERE id = $2`,
          [item.quantity, item.product_id]
        );
      }
      
      // Update participants if it's an event
      if (item.event_id) {
        await client.query(
          `UPDATE events 
           SET current_participants = current_participants + $1 
           WHERE id = $2`,
          [item.quantity, item.event_id]
        );
      }
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({
      message: 'Order created successfully',
      order_id: orderId
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = orderResult.rows[0];
    
    // Get order items
    const itemsResult = await pool.query(
      `SELECT oi.*, 
        p.title as product_title, p.image_url as product_image,
        e.title as event_title
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       LEFT JOIN events e ON oi.event_id = e.id
       WHERE oi.order_id = $1`,
      [id]
    );
    
    order.items = itemsResult.rows;
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;