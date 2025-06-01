import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/events/EventCard';
import { motion } from 'framer-motion';

const Workshops: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Workshops & Events
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Join our hands-on workshops and art events. Learn new techniques, connect with 
            other art enthusiasts, and explore your creativity in a supportive environment.
          </p>
        </motion.div>
        
        {/* Workshops Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse card p-6">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/3 mb-4"></div>
                <div className="h-24 bg-neutral-200 rounded mb-4"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-6 bg-neutral-200 rounded w-1/5"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                </div>
                <div className="h-10 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-neutral-600">No upcoming workshops at this time</h3>
            <p className="text-neutral-500 mt-2">
              Please check back soon for new workshop announcements
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {events.map((event: any) => (
              <motion.div key={event.id} variants={item}>
                <EventCard
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  event_date={event.event_date}
                  price={event.price}
                  location={event.location}
                  max_participants={event.max_participants}
                  current_participants={event.current_participants}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Workshops;