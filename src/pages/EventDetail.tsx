import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../services/api';
import { ArrowLeft, Calendar, MapPin, Users, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEventById(parseInt(id));
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);
  
  const handleAddToCart = () => {
    if (event) {
      addItem({
        id: event.id,
        title: event.title,
        price: event.price,
        event_date: event.event_date,
        quantity: quantity,
        type: 'event'
      });
      
      // Reset quantity
      setQuantity(1);
      
      // Show confirmation toast/notification
      alert(`${event.title} added to cart!`);
    }
  };
  
  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `${formattedDate} at ${formattedTime}`;
  };
  
  // Calculate available spots
  const getAvailableSpots = () => {
    if (!event) return 0;
    return event.max_participants - event.current_participants;
  };
  
  if (loading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="mb-8">
              <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/3 mb-6"></div>
              
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-6"></div>
              
              <div className="h-12 bg-neutral-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Event Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The event you are looking for does not exist or has been removed.
          </p>
          <Link to="/workshops" className="btn btn-primary">
            Back to Workshops
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/workshops" className="text-neutral-600 hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Back to Workshops</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-4">
                Workshop
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
                {event.title}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-neutral-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDateTime(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{getAvailableSpots()} spots left</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">About This Workshop</h2>
              <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
                {event.description}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Registration</h2>
                <p className="text-2xl text-indigo-600 font-medium">${event.price.toFixed(2)}</p>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={getAvailableSpots() < 1}
              >
                <ShoppingBag size={18} />
                <span>Register Now</span>
              </button>
              
              {getAvailableSpots() < 1 && (
                <p className="text-red-600 text-center mt-4">
                  This workshop is fully booked
                </p>
              )}
              
              {getAvailableSpots() > 0 && getAvailableSpots() < 3 && (
                <p className="text-amber-600 text-center mt-4">
                  Only {getAvailableSpots()} spots left
                </p>
              )}
            </div>
            
            <div className="border-t border-neutral-200 pt-6">
              <h2 className="text-xl font-medium mb-4">Additional Information</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <span className="font-medium">Materials:</span> All materials will be provided. Just bring yourself and your creativity!
                </p>
                <p>
                  <span className="font-medium">Experience Level:</span> Suitable for all skill levels, from beginners to experienced artists.
                </p>
                <p>
                  <span className="font-medium">Duration:</span> Approximately 3 hours.
                </p>
                <p>
                  <span className="font-medium">Cancellation Policy:</span> Full refund available up to 48 hours before the event. No refunds after that time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;