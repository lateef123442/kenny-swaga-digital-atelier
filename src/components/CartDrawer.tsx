import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ShoppingBag className={`w-5 h-5 ${getCartCount() > 0 ? 'text-champagne' : ''}`} />
          {getCartCount() > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-champagne text-background text-[10px] flex items-center justify-center font-medium"
            >
              {getCartCount()}
            </motion.span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-background border-l border-border/30 flex flex-col">
        <SheetHeader className="border-b border-border/30 pb-6">
          <SheetTitle className="font-serif text-2xl tracking-[0.1em] text-foreground flex items-center gap-4">
            <ShoppingBag className="w-6 h-6 text-champagne" />
            Your Cart
            <span className="text-sm text-muted-foreground font-sans tracking-normal">
              ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <h3 className="font-serif text-xl tracking-[0.1em] text-foreground mb-3">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                Discover our exclusive Nigerian fashion collection
              </p>
              <Link to="/shop" className="btn-luxury text-xs">
                Browse Collection
              </Link>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item, index) => {
                  const product = getProductById(item.productId);
                  return (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 group"
                    >
                      {/* Image */}
                      <Link 
                        to={product ? `/product/${product.slug}` : '#'}
                        className="w-24 h-32 bg-obsidian-light overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Link 
                            to={product ? `/product/${product.slug}` : '#'}
                            className="font-serif text-sm tracking-[0.08em] text-foreground hover:text-champagne transition-colors block mb-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase mb-2">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-champagne tracking-[0.05em]">
                            {item.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border/50">
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-border/30 pt-6 space-y-6">
              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-xl text-champagne tracking-[0.05em]">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Shipping & taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full py-4 bg-champagne text-background text-xs tracking-[0.25em] uppercase hover:bg-foreground transition-colors duration-500 block text-center"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="block text-center text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
