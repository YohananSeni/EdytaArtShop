import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all upcoming events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE event_date > NOW() AND is_active = true ORDER BY event_date ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE id = $1 AND is_active = true',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;