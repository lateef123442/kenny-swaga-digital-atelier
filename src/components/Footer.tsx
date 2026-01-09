import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 border-t border-border/30">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-4xl tracking-[0.15em] text-foreground mb-6">
              KENNY SWAGA
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Redefining luxury fashion through avant-garde design and uncompromising craftsmanship.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-champagne mb-8">
              Navigate
            </h4>
            <ul className="space-y-4">
              {['Collection', 'Lookbook', 'Atelier', 'About', 'Press'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
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
              {['Instagram', 'Twitter', 'Pinterest', 'LinkedIn'].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gold-underline"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Kenny Swaga. All rights reserved.
          </span>
          <div className="flex items-center gap-8">
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
