import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { getProducts, getEvents } from '../services/api';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, eventsData] = await Promise.all([
          getProducts(),
          getEvents()
        ]);
        
        // Get first 4 products
        setFeaturedProducts(productsData.slice(0, 4));
        
        // Get first 2 events
        setUpcomingEvents(eventsData.slice(0, 2));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home page data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-6">
              Bring Art Into Your Everyday Life
            </h1>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Discover unique art prints, original artwork, and immersive workshops 
              from talented artists. Transform your space with pieces that inspire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prints" className="btn btn-primary">
                Explore Prints
              </Link>
              <Link to="/originals" className="btn btn-secondary">
                View Originals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium">Featured Artwork</h2>
            <Link to="/prints" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>
      
      {/* About Artist Banner */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
                Meet the Artist
              </h2>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Jane Doe is a contemporary artist specializing in vibrant abstract 
                landscapes and botanical studies. Her work explores the relationship 
                between human perception and natural environments.
              </p>
              <Link to="/about" className="btn btn-accent">
                Learn More
              </Link>
            </motion.div>
            
            <motion.div
              className="relative aspect-square max-w-md mx-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg" 
                alt="Artist at work" 
                className="rounded-lg object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Workshops */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-medium">Upcoming Workshops</h2>
            <Link to="/workshops" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="animate-pulse card p-6">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/3 mb-4"></div>
                  <div className="h-24 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-10 bg-neutral-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event: any) => (
                <motion.div 
                  key={event.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="card"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    <p className="text-neutral-500 text-sm mb-1">
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-neutral-500 text-sm mb-4">{event.location}</p>
                    <p className="text-neutral-700 mb-4 line-clamp-3">{event.description}</p>
                    <Link to={`/event/${event.id}`} className="btn btn-primary">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">
              Stay Updated
            </h2>
            <p className="text-neutral-600 mb-6">
              Subscribe to our newsletter for updates on new artwork, upcoming 
              workshops, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;