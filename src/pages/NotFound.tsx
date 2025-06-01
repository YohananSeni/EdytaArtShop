import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-serif font-medium text-neutral-200 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/prints" className="btn btn-secondary">
              Browse Prints
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;