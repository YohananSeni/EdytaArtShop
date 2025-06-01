import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  event_date: string;
  price: number;
  location: string;
  max_participants: number;
  current_participants: number;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  event_date,
  price,
  location,
  max_participants,
  current_participants
}) => {
  // Format date
  const formattedDate = new Date(event_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format time
  const formattedTime = new Date(event_date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Calculate spots left
  const spotsLeft = max_participants - current_participants;
  
  return (
    <motion.div 
      className="card h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            Workshop
          </span>
        </div>
        
        <h3 className="text-xl font-medium text-neutral-900 mb-2">{title}</h3>
        
        <div className="text-neutral-500 flex items-center gap-2 mb-1 text-sm">
          <Calendar size={16} />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        
        <div className="text-neutral-500 flex items-center gap-2 mb-4 text-sm">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        
        <p className="text-neutral-700 mb-4 flex-grow line-clamp-3">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-indigo-600 font-medium text-lg">${price.toFixed(2)}</span>
          <span className="text-sm text-neutral-500">
            {spotsLeft} spots left
          </span>
        </div>
        
        <Link 
          to={`/event/${id}`}
          className="btn btn-primary mt-auto w-full"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;