import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PayPalCheckout from '../components/checkout/PayPalCheckout';
import { motion } from 'framer-motion';

const Checkout: React.FC = () => {
  const { state } = useCart();
  const { items, total } = state;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zip.trim()) errors.zip = 'ZIP code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with payment
      console.log('Form is valid, proceed with payment');
    }
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/cart" className="text-neutral-600 hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
        </div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-neutral-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input ${formErrors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-neutral-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input ${formErrors.lastName ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${formErrors.email ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-neutral-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`input ${formErrors.address ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-neutral-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input ${formErrors.city ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="state" className="block text-neutral-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`input ${formErrors.state ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.state && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="zip" className="block text-neutral-700 mb-1">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={`input ${formErrors.zip ? 'border-red-500' : ''}`}
                    required
                  />
                  {formErrors.zip && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.zip}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="country" className="block text-neutral-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
              <div className="max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 my-4 pt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-medium mb-4">Payment</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <PayPalCheckout 
                customerInfo={{
                  name: `${formData.firstName} ${formData.lastName}`,
                  email: formData.email,
                  address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;