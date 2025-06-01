import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all active products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  
  if (category !== 'print' && category !== 'original') {
    return res.status(400).json({ error: 'Invalid category. Must be "print" or "original"' });
  }
  
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 AND is_active = true ORDER BY created_at DESC',
      [category]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single product by ID
router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND is_active = true',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;