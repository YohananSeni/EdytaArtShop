-- Sample prints (10)
INSERT INTO products (title, description, price, category, image_url, stock_quantity, is_active)
VALUES
  ('Ocean Waves Abstract', 'A vibrant abstract print inspired by ocean waves, featuring blues and teals in flowing patterns.', 25.00, 'print', 'https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg', 50, true),
  ('Forest Meditation', 'Calming forest scene with misty greens and subtle light patterns filtering through trees.', 30.00, 'print', 'https://images.pexels.com/photos/6004828/pexels-photo-6004828.jpeg', 35, true),
  ('Urban Geometry', 'Architectural inspired print featuring bold lines and geometric shapes in urban settings.', 22.00, 'print', 'https://images.pexels.com/photos/7170763/pexels-photo-7170763.jpeg', 45, true),
  ('Botanical Study No. 3', 'Detailed illustration of botanical elements with fine line work and subtle coloring.', 28.00, 'print', 'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg', 40, true),
  ('Desert Sunset', 'Warm-toned landscape featuring desert silhouettes against a gradient sunset sky.', 35.00, 'print', 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg', 30, true),
  ('Abstract Florals', 'Modern interpretation of floral elements with bold colors and abstract forms.', 24.00, 'print', 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg', 50, true),
  ('Mountain Silhouettes', 'Minimalist mountain landscape with layered silhouettes in monochromatic tones.', 26.00, 'print', 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg', 40, true),
  ('City Lights', 'Abstract representation of city lights at night with bokeh effects and deep blues.', 32.00, 'print', 'https://images.pexels.com/photos/2096622/pexels-photo-2096622.jpeg', 25, true),
  ('Watercolor Memories', 'Soft watercolor-style print with blending colors and dreamy atmospheric quality.', 29.00, 'print', 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png', 35, true),
  ('Geometric Joy', 'Playful geometric composition with bright primary colors and balanced forms.', 20.00, 'print', 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg', 60, true);

-- Sample originals (5)
INSERT INTO products (title, description, price, category, image_url, stock_quantity, is_active)
VALUES
  ('Coastal Memories', 'Original acrylic painting on canvas depicting abstracted coastal landscape with textured waves and horizon.', 450.00, 'original', 'https://images.pexels.com/photos/2079851/pexels-photo-2079851.jpeg', 1, true),
  ('Garden Dreams', 'Large-scale original mixed media painting featuring lush garden elements with gold leaf accents.', 680.00, 'original', 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg', 1, true),
  ('Urban Rhythms', 'Original oil painting exploring city life through abstract architectural forms and movement.', 550.00, 'original', 'https://images.pexels.com/photos/3707669/pexels-photo-3707669.jpeg', 1, true),
  ('Field of Wonder', 'Expansive landscape original in oil featuring wildflower fields with impressionistic technique.', 720.00, 'original', 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg', 1, true),
  ('Abstract Study in Blue', 'Contemplative abstract original work exploring depth and emotion through varied blue tones.', 390.00, 'original', 'https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg', 1, true);

-- Sample events/workshops (5)
INSERT INTO events (title, description, event_date, price, max_participants, current_participants, location, is_active)
VALUES
  ('Introduction to Printmaking', 'Learn the basics of relief printmaking in this hands-on workshop suitable for beginners. All materials provided.', NOW() + INTERVAL '15 days', 75.00, 12, 4, 'Main Street Studio, Portland', true),
  ('Watercolor Techniques', 'Explore various watercolor techniques from wet-on-wet to detailed dry brush. Suitable for all skill levels.', NOW() + INTERVAL '21 days', 65.00, 15, 7, 'Riverside Arts Center, Portland', true),
  ('Abstract Painting Weekend', 'Immersive two-day workshop focused on abstract expression through acrylic painting. Intermediate level recommended.', NOW() + INTERVAL '30 days', 150.00, 10, 3, 'Modern Space Gallery, Portland', true),
  ('Botanical Drawing', 'Detailed instruction on botanical illustration using pencil and ink. Focus on observation and technique.', NOW() + INTERVAL '14 days', 60.00, 12, 6, 'Main Street Studio, Portland', true),
  ('Mixed Media Exploration', 'Experimental workshop combining various media and techniques. Perfect for artists looking to expand their practice.', NOW() + INTERVAL '45 days', 85.00, 8, 2, 'Riverside Arts Center, Portland', true);