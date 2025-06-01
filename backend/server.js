import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productsRoutes from './routes/products.js';
import eventsRoutes from './routes/events.js';
import ordersRoutes from './routes/orders.js';
import paypalRoutes from './routes/paypal.js';
import aboutRoutes from './routes/about.js';
import { setupDatabase } from './config/database.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for images)
app.use('/images', express.static(join(__dirname, 'public/images')));

// API Routes
app.use('/api/products', productsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/about', aboutRoutes);

// Setup database and tables if needed
setupDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});