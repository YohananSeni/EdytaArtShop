import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types
type ProductItem = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  category: string;
  quantity: number;
  type: 'product';
};

type EventItem = {
  id: number;
  title: string;
  price: number;
  event_date: string;
  quantity: number;
  type: 'event';
};

type CartItem = ProductItem | EventItem;

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number, type: 'product' | 'event' } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number, type: 'product' | 'event', quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, type: 'product' | 'event') => void;
  updateQuantity: (id: number, type: 'product' | 'event', quantity: number) => void;
  clearCart: () => void;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  total: 0
};

// Calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
      } else {
        // New item, add to cart
        updatedItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: action.payload.quantity
        };
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      return state;
    }
    
    case 'CLEAR_CART':
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const storedCart = localStorage.getItem('cart');
  const initialCartState = storedCart ? JSON.parse(storedCart) : initialState;
  
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Actions
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItem = (id: number, type: 'product' | 'event') => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, type } });
  };
  
  const updateQuantity = (id: number, type: 'product' | 'event', quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, type, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};