import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 border-t border-border/30">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <h3 className="font-serif text-4xl tracking-[0.15em] text-foreground mb-6">
              KENNY SWAGA
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              Premium Nigerian menswear for the modern king. Crafted with pride in Lagos, delivered across Nigeria and beyond.
            </p>
            {/* Nigerian flag colors */}
            <div className="flex gap-1 mb-6">
              <div className="w-8 h-2 bg-green-600" />
              <div className="w-8 h-2 bg-white" />
              <div className="w-8 h-2 bg-green-600" />
            </div>
            <p className="text-xs text-muted-foreground">🇳🇬 Made with love in Nigeria</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-champagne mb-8">
              Shop
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'All Products', to: '/shop' },
                { name: 'Senator Styles', to: '/shop' },
                { name: 'Agbada', to: '/shop' },
                { name: 'Kaftan', to: '/shop' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-champagne mb-8">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/2349054089075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="tel:+2349054089075"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                >
                  +234 905 408 9075
                </a>
              </li>
              <li>
                <a
                  href="mailto:charleskenny431@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Kenny Swaga. All rights reserved. Lagos, Nigeria.
          </span>
          <div className="flex items-center gap-8">
            <Link
              to="/about"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <a
              href="#"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12vw] font-serif text-foreground/[0.015] tracking-[0.2em] pointer-events-none whitespace-nowrap overflow-hidden">
        KENNY SWAGA
      </div>
    </footer>
  );
};

export default Footer;
