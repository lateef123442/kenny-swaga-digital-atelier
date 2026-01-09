import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticCursor from '@/components/MagneticCursor';
import SmoothScroll from '@/components/SmoothScroll';
import atelierImage from '@/assets/atelier-interior.jpg';
import sketchImage from '@/assets/designer-sketch.jpg';

const timelineEvents = [
  {
    year: '2018',
    title: 'The Vision',
    description: 'Kenny Swaga was born from a singular vision: to create fashion that transcends time. In a small Lagos studio, the first sketches emerged—raw, ambitious, unapologetic.',
  },
  {
    year: '2019',
    title: 'First Collection',
    description: 'The debut "OBSIDIAN" collection launched at Lagos Fashion Week, immediately catching the eye of international critics. The stark contrast of architectural silhouettes against Nigerian heritage patterns created a new dialogue in fashion.',
  },
  {
    year: '2020',
    title: 'Paris Calling',
    description: 'Despite global challenges, Kenny Swaga secured a coveted slot at Paris Fashion Week. The digital presentation "ETHEREAL" garnered 2 million views in 48 hours.',
  },
  {
    year: '2022',
    title: 'The Flagship',
    description: 'The first flagship atelier opened in Lagos—a 5,000 sq ft space designed to feel like stepping into a living sculpture. Private clients flew in from Milan, Dubai, and New York.',
  },
  {
    year: '2024',
    title: 'Global Recognition',
    description: 'Kenny Swaga dressed three A-list celebrities for the Met Gala. The brand was featured in Vogue, Harper\'s Bazaar, and named "Designer to Watch" by Business of Fashion.',
  },
  {
    year: '2026',
    title: 'The Future',
    description: 'Today, Kenny Swaga stands at the intersection of African heritage and avant-garde luxury. Each piece tells a story of craftsmanship, vision, and uncompromising excellence.',
  },
];

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, scale }}
      className={`relative flex items-center gap-8 md:gap-16 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Year marker */}
      <div className="hidden md:flex flex-1 justify-end">
        <span className={`font-serif text-6xl lg:text-8xl text-gradient-gold ${
          index % 2 === 0 ? 'text-right' : 'text-left'
        }`}>
          {event.year}
        </span>
      </div>

      {/* Center line dot */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-4 h-4 rounded-full bg-champagne"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-champagne/30 animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <span className="md:hidden font-serif text-4xl text-gradient-gold block mb-4">{event.year}</span>
        <h3 className="font-serif text-2xl md:text-3xl tracking-[0.1em] text-foreground mb-4">
          {event.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <SmoothScroll>
      <div className="hidden lg:block">
        <MagneticCursor />
      </div>

      <Navigation />

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${atelierImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-8"
            >
              Est. 2018 • Lagos, Nigeria
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-foreground"
              >
                OUR STORY
              </motion.h1>
            </div>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className="py-32 md:py-48">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-6 block">
                  The Philosophy
                </span>
                <h2 className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground mb-8 leading-tight">
                  Where Heritage
                  <br />
                  <span className="text-gradient-gold">Meets Avant-Garde</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Kenny Swaga exists at the intersection of Nigerian craftsmanship and Parisian haute couture. 
                  Every stitch carries the weight of ancestral wisdom; every silhouette pushes the boundaries 
                  of contemporary design.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe luxury is not about excess—it's about intention. Each piece in our collection 
                  is created with obsessive attention to detail, using only the finest materials sourced 
                  from ethical suppliers worldwide.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sketchImage}
                    alt="Designer sketching haute couture"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 border border-champagne/20" />
                </div>
                {/* Floating accent */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 border border-champagne/30 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="font-serif text-4xl text-gradient-gold">KS</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-32 md:py-48 relative">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4 block">
                Our Journey
              </span>
              <h2 className="font-serif text-5xl md:text-7xl tracking-[0.08em] text-foreground">
                THE TIMELINE
              </h2>
            </motion.div>

            {/* Timeline line */}
            <div className="absolute left-1/2 top-64 bottom-32 w-px bg-gradient-to-b from-transparent via-champagne/30 to-transparent hidden md:block" />

            <div className="space-y-24 md:space-y-32">
              {timelineEvents.map((event, index) => (
                <TimelineItem key={event.year} event={event} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 md:py-48 bg-obsidian-light">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-serif text-5xl md:text-6xl tracking-[0.08em] text-foreground">
                OUR VALUES
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Craftsmanship',
                  description: 'Every piece is handcrafted by master artisans with decades of experience. We never rush perfection.',
                },
                {
                  title: 'Sustainability',
                  description: 'We source materials ethically and produce in limited quantities to minimize environmental impact.',
                },
                {
                  title: 'Innovation',
                  description: 'We blend traditional techniques with cutting-edge technology to create garments that defy expectations.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="luxury-card p-12 text-center"
                >
                  <span className="block font-serif text-6xl text-champagne/20 mb-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl tracking-[0.1em] text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 md:py-48">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-6xl tracking-[0.08em] text-foreground mb-8">
                Experience the Collection
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-12">
                Discover pieces that transcend seasons and define legacies.
              </p>
              <Link to="/shop" className="btn-luxury">
                Explore Shop
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default About;
