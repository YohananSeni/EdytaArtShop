import axios from 'axios';

// TODO: Replace dummy data with actual API endpoints once backend is ready
// TODO: Add error handling and loading states for all API calls
// TODO: Implement retry logic for failed requests
// TODO: Add request caching for better performance
// TODO: Add request interceptors for authentication when needed

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// TODO: Replace with actual API calls to PostgreSQL database
const dummyProducts = [
  {
    id: 1,
    title: "Ocean Waves Abstract",
    description: "A vibrant abstract print inspired by ocean waves, featuring blues and teals in flowing patterns.",
    price: 25.00,
    category: "print",
    image_url: "https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg",
    stock_quantity: 50,
    is_active: true
  },
  {
    id: 2,
    title: "Forest Meditation",
    description: "Calming forest scene with misty greens and subtle light patterns filtering through trees.",
    price: 30.00,
    category: "print",
    image_url: "https://images.pexels.com/photos/6004828/pexels-photo-6004828.jpeg",
    stock_quantity: 35,
    is_active: true
  },
  {
    id: 3,
    title: "Coastal Memories",
    description: "Original acrylic painting on canvas depicting abstracted coastal landscape with textured waves and horizon.",
    price: 450.00,
    category: "original",
    image_url: "https://images.pexels.com/photos/2079851/pexels-photo-2079851.jpeg",
    stock_quantity: 1,
    is_active: true
  }
];

// TODO: Implement real-time event availability checking
const dummyEvents = [
  {
    id: 1,
    title: "Introduction to Printmaking",
    description: "Learn the basics of relief printmaking in this hands-on workshop suitable for beginners. All materials provided.",
    event_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    price: 75.00,
    max_participants: 12,
    current_participants: 4,
    location: "Main Street Studio, Portland",
    is_active: true
  },
  {
    id: 2,
    title: "Watercolor Techniques",
    description: "Explore various watercolor techniques from wet-on-wet to detailed dry brush. Suitable for all skill levels.",
    event_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    price: 65.00,
    max_participants: 15,
    current_participants: 7,
    location: "Riverside Arts Center, Portland",
    is_active: true
  }
];

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
  // TODO: Replace with actual API call
  return dummyProducts;
};

export const getProductsByCategory = async (category: string) => {
  // TODO: Replace with actual API call
  return dummyProducts.filter(product => product.category === category);
};

export const getProductById = async (id: number) => {
  // TODO: Replace with actual API call
  return dummyProducts.find(product => product.id === id);
};

export const getEvents = async () => {
  // TODO: Replace with actual API call
  return dummyEvents;
};

export const getEventById = async (id: number) => {
  // TODO: Replace with actual API call
  return dummyEvents.find(event => event.id === id);
};

export const getAboutData = async () => {
  // TODO: Replace with actual API call
  return dummyAboutData;
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