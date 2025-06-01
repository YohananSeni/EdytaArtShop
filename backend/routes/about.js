import express from 'express';

const router = express.Router();

// Get about page content
router.get('/', (req, res) => {
  // Hardcoded about page content
  const aboutData = {
    artistName: "Jane Doe",
    biography: `
      Jane Doe is a contemporary artist based in Portland, Oregon, specializing in vibrant 
      abstract landscapes and botanical studies. With over 15 years of experience, her work 
      has been featured in galleries across the United States and Europe.
      
      After receiving her MFA from Rhode Island School of Design in 2008, Jane developed 
      her distinctive style combining traditional techniques with modern experimentation. 
      Her work explores the relationship between human perception and natural environments.
      
      Jane's prints are created using a combination of traditional printmaking techniques 
      and digital processes, allowing for unique textures and color gradients that have 
      become her signature aesthetic.
    `,
    artistStatement: `
      My work explores the boundary between the structured world we build and the organic 
      chaos of nature. Through color and form, I seek to create spaces where viewers can 
      find both energy and contemplation.
      
      Each piece begins as an observation of the natural world – a hiking trail, a garden 
      in bloom, or the way light filters through trees. These observations are then 
      abstracted through my process, creating works that hover between representation 
      and pure expression.
      
      I believe art should be accessible while still challenging our perceptions. My prints 
      are created with this philosophy in mind, offering pieces that can transform everyday 
      spaces into opportunities for reflection and joy.
    `,
    studioImages: [
      "/images/studio-1.jpg",
      "/images/studio-2.jpg",
      "/images/studio-3.jpg"
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
      },
      {
        year: "2021",
        title: "Botanical Studies",
        gallery: "Portland Contemporary, Oregon"
      }
    ]
  };
  
  res.json(aboutData);
});

export default router;