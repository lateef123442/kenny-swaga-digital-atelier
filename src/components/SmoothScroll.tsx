import { useEffect, useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.5,
  });

  useEffect(() => {
    // Enable smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne via-champagne-light to-champagne z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />
      {children}
    </div>
  );
};

export default SmoothScroll;
