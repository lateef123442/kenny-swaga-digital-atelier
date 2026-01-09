import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticCursor from '@/components/MagneticCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { useWishlist } from '@/contexts/WishlistContext';

import productBag from '@/assets/product-bag.jpg';
import productBlouse from '@/assets/product-blouse.jpg';
import productCoat from '@/assets/product-coat.jpg';
import productBoots from '@/assets/product-boots.jpg';
import productSunglasses from '@/assets/product-sunglasses.jpg';
import productScarf from '@/assets/product-scarf.jpg';
import lookbook1 from '@/assets/lookbook-1.jpg';
import lookbook2 from '@/assets/lookbook-2.jpg';

const products = [
  { id: 1, image: productBag, name: '"STRUCTURE"', category: 'Accessories', price: '€2,800', subtitle: 'Leather Tote' },
  { id: 2, image: productBlouse, name: '"SHADOW"', category: 'Ready-to-Wear', price: '€1,450', subtitle: 'Silk Blouse' },
  { id: 3, image: productCoat, name: '"OBSIDIAN"', category: 'Ready-to-Wear', price: '€4,200', subtitle: 'Wool Coat' },
  { id: 4, image: productBoots, name: '"STRIDE"', category: 'Footwear', price: '€1,890', subtitle: 'Leather Boots' },
  { id: 5, image: productSunglasses, name: '"VISION"', category: 'Accessories', price: '€680', subtitle: 'Gold Frames' },
  { id: 6, image: productScarf, name: '"EMBRACE"', category: 'Accessories', price: '€520', subtitle: 'Cashmere Scarf' },
  { id: 7, image: lookbook1, name: '"NOIR"', category: 'Ready-to-Wear', price: '€3,200', subtitle: 'Trench Coat' },
  { id: 8, image: lookbook2, name: '"ETHEREAL"', category: 'Couture', price: '€8,500', subtitle: 'Sculptural Gown' },
];

const categories = ['All', 'Ready-to-Wear', 'Accessories', 'Footwear', 'Couture'];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-light">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-background/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center border border-champagne/30 bg-background/50 backdrop-blur-sm hover:bg-champagne hover:border-champagne transition-all duration-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered || inWishlist ? 1 : 0, scale: isHovered || inWishlist ? 1 : 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                inWishlist ? 'fill-champagne text-champagne' : 'text-foreground'
              }`}
            />
          </motion.button>

          {/* Quick View Button */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            <button className="btn-luxury text-xs py-3 px-8">
              Quick View
            </button>
          </motion.div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-champagne/80 bg-background/60 backdrop-blur-sm px-3 py-1">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-xl tracking-[0.1em] text-foreground">
              {product.name}
            </h3>
            <span className="text-champagne text-sm tracking-[0.1em]">
              {product.price}
            </span>
          </div>
          <p className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
            {product.subtitle}
          </p>
        </div>

        {/* Border accent on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '1px solid',
            borderColor: isHovered ? 'hsl(43 54% 59% / 0.4)' : 'transparent',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { wishlist } = useWishlist();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <SmoothScroll>
      <div className="hidden lg:block">
        <MagneticCursor />
      </div>

      <Navigation />

      <main className="pt-32">
        {/* Header */}
        <section className="container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4 block">
              Spring/Summer 2026
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-serif text-5xl md:text-7xl tracking-[0.08em] text-foreground">
                THE COLLECTION
              </h1>
              
              <div className="flex items-center gap-6">
                {/* Wishlist Counter */}
                <Link
                  to="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-champagne text-champagne' : ''}`} />
                  <span className="text-sm tracking-[0.15em] uppercase">
                    Wishlist ({wishlist.length})
                  </span>
                </Link>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span className="text-sm tracking-[0.15em] uppercase">Filter</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-4 pt-8 pb-4 border-b border-border/30">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-xs tracking-[0.25em] uppercase px-6 py-3 border transition-all duration-500 ${
                        activeCategory === category
                          ? 'border-champagne bg-champagne text-background'
                          : 'border-border/50 text-muted-foreground hover:border-champagne hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setShowFilters(false)}
                    className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Product Grid */}
        <section className="container pb-32">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <button className="btn-luxury">
              Load More
            </button>
          </motion.div>
        </section>

        {/* Featured Banner */}
        <section className="relative py-32 bg-obsidian-light overflow-hidden">
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-6 block">
                Private Appointments
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground mb-6">
                Bespoke Service
              </h2>
              <p className="text-muted-foreground mb-10">
                Experience personalized styling and custom tailoring at our flagship atelier. 
                Book a private appointment for an exclusive shopping experience.
              </p>
              <Link to="/#atelier" className="btn-luxury">
                Book Appointment
              </Link>
            </motion.div>
          </div>

          {/* Background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-foreground/[0.02] tracking-[0.2em] pointer-events-none whitespace-nowrap">
            ATELIER
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default Shop;
