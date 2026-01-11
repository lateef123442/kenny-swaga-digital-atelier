import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus, ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticCursor from '@/components/MagneticCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { getProductBySlug, products } from '@/data/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0]
    });

    setIsAdded(true);
    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedSize}) added to your cart.`
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <SmoothScroll>
      <div className="hidden lg:block">
        <MagneticCursor />
      </div>

      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm tracking-[0.15em] uppercase">Back to Collection</span>
            </Link>
          </motion.div>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image Carousel */}
              <div className="relative mb-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <motion.div 
                          className="aspect-[3/4] overflow-hidden bg-obsidian-light"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm border-champagne/30 hover:bg-champagne hover:border-champagne text-foreground hover:text-background" />
                  <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm border-champagne/30 hover:bg-champagne hover:border-champagne text-foreground hover:text-background" />
                </Carousel>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square w-20 overflow-hidden transition-all duration-300 ${
                      activeImage === index 
                        ? 'ring-2 ring-champagne' 
                        : 'ring-1 ring-border/30 hover:ring-champagne/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:py-8"
            >
              {/* Category */}
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4 block">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="text-2xl text-champagne tracking-[0.1em] mb-8">
                {product.price}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-[0.25em] uppercase text-foreground">
                    Select Size
                  </span>
                  <button className="text-xs tracking-[0.15em] uppercase text-champagne hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border transition-all duration-300 text-sm tracking-[0.1em] ${
                        selectedSize === size
                          ? 'border-champagne bg-champagne text-background'
                          : 'border-border/50 text-muted-foreground hover:border-champagne hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-10">
                <span className="text-xs tracking-[0.25em] uppercase text-foreground mb-4 block">
                  Quantity
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border/50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-10">
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 text-xs tracking-[0.25em] uppercase transition-all duration-500 flex items-center justify-center gap-3 ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-champagne text-background hover:bg-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </motion.button>
                <motion.button
                  onClick={handleWishlistClick}
                  className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                    inWishlist
                      ? 'border-champagne bg-champagne'
                      : 'border-border/50 hover:border-champagne'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      inWishlist ? 'fill-background text-background' : 'text-foreground'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Product Details */}
              <div className="border-t border-border/30 pt-8">
                <h3 className="text-xs tracking-[0.25em] uppercase text-foreground mb-4">
                  Product Details
                </h3>
                <ul className="space-y-2 mb-6">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-3">
                      <span className="w-1 h-1 bg-champagne rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">Fabric:</span> {product.fabric}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4 block">
                  You May Also Like
                </span>
                <h2 className="font-serif text-3xl md:text-4xl tracking-[0.08em] text-foreground">
                  Related Pieces
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/product/${relatedProduct.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-light mb-4">
                        <motion.img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="font-serif text-lg tracking-[0.1em] text-foreground group-hover:text-champagne transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{relatedProduct.price}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default ProductDetail;
