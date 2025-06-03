import axios from 'axios';

// TODO: Replace dummy data with actual API endpoints once backend is ready
// TODO: Add error handling and loading states for all API calls
// TODO: Implement retry logic for failed requests
// TODO: Add request caching for better performance
// TODO: Add request interceptors for authentication when needed

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';



// TODO: Move content to CMS for easy updates
const dummyAboutData = {
  artistName: "Jane Doe",
  biography: `Jane Doe is a contemporary artist based in Portland, Oregon, specializing in vibrant 
    abstract landscapes and botanical studies. With over 15 years of experience, her work 
    has been featured in galleries across the United States and Europe.`,
  artistStatement: `My work explores the boundary between the structured world we build and the organic 
    chaos of nature. Through color and form, I seek to create spaces where viewers can 
    find both energy and contemplation.`,
  studioImages: [
    "https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg",
    "https://images.pexels.com/photos/3094217/pexels-photo-3094217.jpeg",
    "https://images.pexels.com/photos/3094216/pexels-photo-3094216.jpeg"
  ],
  contactInfo: {
    email: "contact@janedoeart.com",
    instagram: "@janedoe_art",
    studioLocation: "Portland Arts District, Oregon"
  },
  exhibitions: [
    {
      year: "2023",
      title: "Natural Abstractions",
      gallery: "Modern Space Gallery, New York"
    },
    {
      year: "2022",
      title: "Color Fields",
      gallery: "West Coast Arts, San Francisco"
    }
  ]
};

// TODO: Implement proper API error handling and response types
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// TODO: Add request/response interceptors for error handling
// TODO: Add authentication token management
// TODO: Implement request timeout handling

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data.map((product: any) => ({
    ...product,
    price: Number(product.price)
  }));
};

export const getProductsByCategory = async (category: string) => {
  const response = await axios.get(`${API_URL}/products/${category}`);
  return response.data.map((product: any) => ({
    ...product,
    price: Number(product.price)
  }));
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/products/detail/${id}`);
  const product = response.data;
  return {
    ...product,
    price: Number(product.price)
  };
};

export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventById = async (id: number) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

// Static about data
const aboutData = {
  artistName: "Jane Doe",
  biography: `Jane Doe is a contemporary artist based in Portland, Oregon, specializing in vibrant 
    abstract landscapes and botanical studies. With over 15 years of experience, her work 
    has been featured in galleries across the United States and Europe.`,
  artistStatement: `My work explores the boundary between the structured world we build and the organic 
    chaos of nature. Through color and form, I seek to create spaces where viewers can 
    find both energy and contemplation.`,
  studioImages: [
    "https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg",
    "https://images.pexels.com/photos/3094217/pexels-photo-3094217.jpeg",
    "https://images.pexels.com/photos/3094216/pexels-photo-3094216.jpeg"
  ],
  contactInfo: {
    email: "contact@janedoeart.com",
    instagram: "@janedoe_art",
    studioLocation: "Portland Arts District, Oregon"
  },
  exhibitions: [
    {
      year: "2023",
      title: "Natural Abstractions",
      gallery: "Modern Space Gallery, New York"
    },
    {
      year: "2022",
      title: "Color Fields",
      gallery: "West Coast Arts, San Francisco"
    }
  ]
};

export const getAboutData = async () => {
  return aboutData;
};

// TODO: Implement proper order validation and error handling
export const createOrder = async (orderData: any) => {
  // TODO: Replace with actual API call
  return {
    order_id: Math.floor(Math.random() * 1000000),
    ...orderData
  };
};

export const getOrderById = async (id: number) => {
  // TODO: Replace with actual API call
  return {
    id,
    customer_email: "example@email.com",
    customer_name: "John Doe",
    total_amount: 100.00,
    status: "completed",
    created_at: new Date().toISOString(),
    items: [
      {
        id: 1,
        product_title: "Ocean Waves Abstract",
        quantity: 2,
        unit_price: 25.00
      }
    ]
  };
};

// TODO: Implement proper PayPal error handling and transaction logging
export const createPayPalPayment = async (paymentData: any) => {
  // TODO: Replace with actual PayPal API integration
  return {
    id: "PAYPAL-" + Math.random().toString(36).substr(2, 9),
    status: "CREATED"
  };
};

export const executePayPalPayment = async (orderId: string) => {
  // TODO: Replace with actual PayPal API integration
  return {
    id: orderId,
    status: "COMPLETED"
  };
};

export default {
  getProducts,
  getProductsByCategory,
  getProductById,
  getEvents,
  getEventById,
  getAboutData,
  createOrder,
  getOrderById,
  createPayPalPayment,
  executePayPalPayment
};