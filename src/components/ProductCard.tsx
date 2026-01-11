import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
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
      <Link to={`/product/${product.slug}`}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-light">
            <motion.img
              src={product.images[0]}
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
              <span className="btn-luxury text-xs py-3 px-8">
                View Details
              </span>
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
      </Link>
    </motion.div>
  );
};

export default ProductCard;
