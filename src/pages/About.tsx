import React, { useState, useEffect } from 'react';
import { getAboutData } from '../services/api';
import { Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const data = await getAboutData();
        setAboutData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setLoading(false);
      }
    };
    
    fetchAboutData();
  }, []);
  
  if (loading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-neutral-200 rounded w-1/3 mx-auto mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-6"></div>
                
                <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
              </div>
              
              <div className="aspect-square bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!aboutData) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            About the Artist
          </h1>
          <p className="text-neutral-600">
            Unable to load artist information. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About {aboutData.artistName}
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-medium mb-4">Biography</h2>
            <p className="text-neutral-700 mb-6 whitespace-pre-line leading-relaxed">
              {aboutData.biography}
            </p>
            
            <h2 className="text-2xl font-medium mb-4">Artist Statement</h2>
            <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
              {aboutData.artistStatement}
            </p>
          </motion.div>
          
          <motion.div
            className="aspect-square max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src="https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg" 
              alt={aboutData.artistName} 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-medium mb-6 text-center">The Studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aboutData.studioImages.map((image: string, index: number) => (
              <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg`} 
                  alt={`Studio ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div>
            <h2 className="text-2xl font-medium mb-4">Exhibitions</h2>
            <ul className="space-y-4">
              {aboutData.exhibitions.map((exhibition: any, index: number) => (
                <li key={index} className="border-l-2 border-indigo-600 pl-4">
                  <p className="font-medium">{exhibition.title}</p>
                  <p className="text-neutral-500">{exhibition.year} • {exhibition.gallery}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-medium mb-4">Contact</h2>
            <div className="space-y-3">
              <a 
                href={`mailto:${aboutData.contactInfo.email}`} 
                className="flex items-center gap-2 text-neutral-700 hover:text-indigo-600"
              >
                <Mail size={18} />
                <span>{aboutData.contactInfo.email}</span>
              </a>
              <a 
                href={`https://instagram.com/${aboutData.contactInfo.instagram.replace('@', '')}`} 
                className="flex items-center gap-2 text-neutral-700 hover:text-indigo-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
                <span>{aboutData.contactInfo.instagram}</span>
              </a>
              <p className="flex items-start gap-2 text-neutral-700">
                <span className="mt-1">📍</span>
                <span>{aboutData.contactInfo.studioLocation}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;