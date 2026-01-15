import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-fashion.jpg';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        {/* Nigerian pattern overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A052' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4"
        style={{ opacity }}
      >
        {/* Small Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 text-xs tracking-[0.5em] uppercase text-champagne"
        >
          Premium Nigerian Menswear
        </motion.span>

        {/* Nigerian Pride Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-green-600" />
          <div className="flex gap-1">
            <div className="w-3 h-4 bg-green-600" />
            <div className="w-3 h-4 bg-white" />
            <div className="w-3 h-4 bg-green-600" />
          </div>
          <span className="h-px w-8 bg-green-600" />
        </motion.div>

        {/* Main Logo */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
            className="glitch-text text-center font-serif text-5xl md:text-7xl lg:text-[8rem] font-light tracking-[0.15em] text-foreground"
            data-text="KENNY SWAGA"
          >
            KENNY SWAGA
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex items-center gap-8"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne" />
          <p className="text-sm tracking-[0.4em] uppercase text-muted-foreground">
            Dress Like a King • Lagos, Nigeria
          </p>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground font-light italic"
        >
          "Where African Heritage Meets Modern Elegance"
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/shop" className="btn-luxury">
            Shop Collection
          </Link>
          <Link to="/about" className="px-12 py-5 text-sm tracking-[0.3em] uppercase border border-muted-foreground/30 text-muted-foreground hover:border-champagne hover:text-champagne transition-all duration-500">
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-12 w-px bg-gradient-to-b from-champagne to-transparent"
        />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-rl]">
          <span>Made in Nigeria</span>
          <span className="h-16 w-px bg-champagne/30" />
          <span>🇳🇬</span>
        </div>
      </motion.div>

      {/* Left Decorative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.7 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          <span>Senator • Agbada • Kaftan</span>
          <span className="h-16 w-px bg-green-600/30" />
          <span>Authentic</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
