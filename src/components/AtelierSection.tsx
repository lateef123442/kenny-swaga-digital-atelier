import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const AtelierSection = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-obsidian-light to-background" />
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-6 block">
              Private Appointments
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] text-foreground mb-8">
              THE
              <br />
              ATELIER
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-champagne to-transparent mb-8" />
            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mb-12">
              Experience the essence of bespoke luxury. Our atelier offers exclusive 
              private fittings and consultations for discerning clientele. Every piece 
              is meticulously crafted to embody your unique vision.
            </p>
            
            {/* Stats */}
            <div className="flex gap-12">
              {[
                { number: '12', label: 'Master Tailors' },
                { number: '48h', label: 'Bespoke Timeline' },
                { number: '∞', label: 'Possibilities' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="block font-serif text-3xl text-champagne mb-2">
                    {stat.number}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="luxury-card p-12 md:p-16 animate-pulse-glow">
              {/* Card Header */}
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.5em] uppercase text-champagne block mb-4">
                  VIP Concierge
                </span>
                <h3 className="font-serif text-3xl tracking-[0.1em] text-foreground">
                  Contact Us
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-champagne/40 via-champagne/20 to-transparent mb-12" />

              {/* Contact Details */}
              <div className="space-y-8">
                {/* Phone */}
                <motion.a
                  href="tel:09054089075"
                  className="group flex items-center gap-6 text-foreground hover:text-champagne transition-colors duration-500"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-champagne/30 group-hover:border-champagne group-hover:bg-champagne/10 transition-all duration-500">
                    <Phone className="h-5 w-5 text-champagne" />
                  </span>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                      Direct Line
                    </span>
                    <span className="text-lg tracking-[0.1em] font-light">
                      +234 905 408 9075
                    </span>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:charleskenny431@gmail.com"
                  className="group flex items-center gap-6 text-foreground hover:text-champagne transition-colors duration-500"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-champagne/30 group-hover:border-champagne group-hover:bg-champagne/10 transition-all duration-500">
                    <Mail className="h-5 w-5 text-champagne" />
                  </span>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                      Email
                    </span>
                    <span className="text-lg tracking-[0.05em] font-light">
                      charleskenny431@gmail.com
                    </span>
                  </div>
                </motion.a>

                {/* Location */}
                <motion.div
                  className="flex items-center gap-6 text-foreground"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-champagne/30">
                    <MapPin className="h-5 w-5 text-champagne" />
                  </span>
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                      Flagship Atelier
                    </span>
                    <span className="text-lg tracking-[0.05em] font-light">
                      Lagos, Nigeria
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.button
                className="btn-luxury w-full mt-12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Private Appointment
              </motion.button>

              {/* Gold accent line */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-champagne via-champagne/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background text decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif text-foreground/[0.015] tracking-[0.3em] pointer-events-none -translate-x-1/4">
        ATELIER
      </div>
    </section>
  );
};

export default AtelierSection;
