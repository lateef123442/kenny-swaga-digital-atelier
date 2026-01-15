import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const BrandStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-48 md:py-64 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Quote marks */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="block font-serif text-[120px] md:text-[180px] text-champagne leading-none mb-[-40px] md:mb-[-80px]"
          >
            "
          </motion.span>

          {/* Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight tracking-[0.05em] text-foreground mb-12"
          >
            Every Nigerian man deserves to
            <br />
            <span className="text-gradient-gold">dress like royalty.</span>
            <br />
            We make that possible.
          </motion.h2>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            <span className="h-px w-12 bg-champagne/50" />
            <span className="text-xs tracking-[0.4em] uppercase text-champagne">
              Our Promise
            </span>
            <span className="h-px w-12 bg-champagne/50" />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <p className="text-3xl md:text-4xl font-serif text-champagne mb-2">100%</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Nigerian Made</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-champagne mb-2">Premium</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Fabrics Only</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-champagne mb-2">Custom</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Tailoring</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif text-champagne mb-2">Lagos</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Nationwide Delivery</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-12 w-2 h-2 bg-champagne/30 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-16 w-3 h-3 bg-champagne/20 rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-champagne/40 rounded-full"
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
    </section>
  );
};

export default BrandStatement;
