import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Filter, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticCursor from '@/components/MagneticCursor';
import SmoothScroll from '@/components/SmoothScroll';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { products, categories } from '@/data/products';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { wishlist } = useWishlist();
  const { getCartCount } = useCart();

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
              Nigerian Luxury Collection
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-serif text-5xl md:text-7xl tracking-[0.08em] text-foreground">
                THE COLLECTION
              </h1>
              
              <div className="flex items-center gap-6">
                {/* Cart Counter */}
                <Link
                  to="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShoppingBag className={`w-5 h-5 ${getCartCount() > 0 ? 'text-champagne' : ''}`} />
                  <span className="text-sm tracking-[0.15em] uppercase">
                    Cart ({getCartCount()})
                  </span>
                </Link>

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
                Bespoke Tailoring
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground mb-6">
                Custom Senator & Agbada
              </h2>
              <p className="text-muted-foreground mb-10">
                Experience personalized styling and custom tailoring at our Lagos atelier. 
                Book a private appointment for measurements and fabric selection.
              </p>
              <Link to="/#atelier" className="btn-luxury">
                Book Appointment
              </Link>
            </motion.div>
          </div>

          {/* Background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-foreground/[0.02] tracking-[0.2em] pointer-events-none whitespace-nowrap">
            BESPOKE
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default Shop;
