import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Banknote, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Lagos',
    paymentMethod: 'bank_transfer'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 100000 ? 0 : 5000;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          city: formData.city,
          state: formData.state,
          payment_method: formData.paymentMethod,
          items: orderItems,
          subtotal: subtotal,
          shipping_cost: shippingCost,
          total: total
        })
        .select()
        .single();

      if (error) throw error;

      setOrderId(data.id);
      setOrderComplete(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-32 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="font-serif text-4xl mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your order, King.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: <span className="text-champagne font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
            </p>
            <p className="text-muted-foreground mb-8">
              We'll contact you on WhatsApp at {formData.phone} to confirm your order and arrange payment.
            </p>
            <Button onClick={() => navigate('/')} className="btn-luxury">
              Continue Shopping
            </Button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-32 pb-20 px-4 text-center">
          <h1 className="font-serif text-4xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some fresh fits to your cart first, King.</p>
          <Button onClick={() => navigate('/shop')} className="btn-luxury">
            Shop Now
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Shipping Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-serif text-3xl mb-8">Checkout</h1>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="space-y-6">
                  <h2 className="font-serif text-xl text-champagne">Shipping Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="bg-card border-border/50"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="bg-card border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (WhatsApp)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234 800 000 0000"
                        required
                        className="bg-card border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, house number"
                      required
                      className="bg-card border-border/50"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Ikeja, Victoria Island"
                        required
                        className="bg-card border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-md bg-card border border-border/50 text-foreground"
                        required
                      >
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/30" />

                {/* Payment Method */}
                <div className="space-y-6">
                  <h2 className="font-serif text-xl text-champagne">Payment Method</h2>
                  
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 bg-card hover:border-champagne/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <Label htmlFor="bank_transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="w-5 h-5 text-champagne" />
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-xs text-muted-foreground">Pay via bank transfer</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 bg-card hover:border-champagne/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-champagne" />
                        <div>
                          <p className="font-medium">Card Payment</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, Verve</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 bg-card hover:border-champagne/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="pay_on_delivery" id="pay_on_delivery" />
                      <Label htmlFor="pay_on_delivery" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="w-5 h-5 text-champagne" />
                        <div>
                          <p className="font-medium">Pay on Delivery</p>
                          <p className="text-xs text-muted-foreground">Lagos only • Cash or Transfer</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-luxury py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order • ₦${total.toLocaleString()}`
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="text-champagne font-medium">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6 bg-border/30" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₦${shippingCost.toLocaleString()}`}</span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders above ₦100,000
                    </p>
                  )}
                </div>

                <Separator className="my-6 bg-border/30" />

                <div className="flex justify-between text-lg font-serif">
                  <span>Total</span>
                  <span className="text-champagne">₦{total.toLocaleString()}</span>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-4 text-center text-xs text-muted-foreground">
                    <div>
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-champagne/10 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-champagne" />
                      </div>
                      <p>Quality Guaranteed</p>
                    </div>
                    <div>
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-champagne/10 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-champagne" />
                      </div>
                      <p>WhatsApp Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
