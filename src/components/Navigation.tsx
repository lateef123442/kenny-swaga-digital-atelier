import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Collection', href: '#collection' },
  { name: 'Lookbook', href: '#lookbook' },
  { name: 'Atelier', href: '#atelier' },
  { name: 'About', href: '#about' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="container flex items-center justify-between py-6">
          {/* Logo */}
          <a href="/" className="font-serif text-xl tracking-[0.2em] text-foreground gold-underline">
            KS
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-champagne transition-colors duration-500 gold-underline"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <motion.a
              href="#contact"
              className="hidden md:block text-xs tracking-[0.25em] uppercase text-champagne hover:text-champagne-light transition-colors duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Contact
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                className="h-px w-6 bg-foreground block"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="h-px w-6 bg-foreground block"
              />
              <motion.span
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                className="h-px w-6 bg-foreground block"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-3xl tracking-[0.15em] text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 btn-luxury"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
