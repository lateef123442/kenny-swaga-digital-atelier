import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import lookbook1 from '@/assets/lookbook-1.jpg';
import lookbook2 from '@/assets/lookbook-2.jpg';
import lookbook3 from '@/assets/lookbook-3.jpg';
import lookbook4 from '@/assets/lookbook-4.jpg';

const lookbookItems = [
  { id: 1, image: lookbook1, title: '"OBSIDIAN"', subtitle: 'Oversize Tailored Coat', price: '€4,200' },
  { id: 2, image: lookbook2, title: '"IVORY"', subtitle: 'Sculptural Gown', price: '€8,500' },
  { id: 3, image: lookbook3, title: '"SHADOW"', subtitle: 'Deconstructed Suit', price: '€3,800' },
  { id: 4, image: lookbook4, title: '"ETHEREAL"', subtitle: 'Flowing Silk Dress', price: '€6,200' },
];

const GalleryItem = ({ item, index }: { item: typeof lookbookItems[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="gallery-item relative"
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image Container */}
        <div className="relative h-[70vh] w-[350px] md:w-[400px] overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-background/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-8"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
          >
            {/* Index number */}
            <motion.span
              className="absolute top-6 left-6 text-[10px] tracking-[0.4em] text-champagne/60"
              animate={{ opacity: isHovered ? 1 : 0.4 }}
            >
              {String(item.id).padStart(2, '0')}
            </motion.span>

            {/* Title and details */}
            <motion.div
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-3xl tracking-[0.1em] text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                {item.subtitle}
              </p>
              <span className="text-champagne text-sm tracking-[0.15em]">
                {item.price}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Border accent */}
        <motion.div
          className="absolute inset-0 border border-champagne/0 pointer-events-none"
          animate={{
            borderColor: isHovered ? 'hsl(43 54% 59% / 0.4)' : 'hsl(43 54% 59% / 0)',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const LookbookGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Section Header */}
      <div className="container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-champagne mb-4">
            Spring/Summer 2026
          </span>
          <h2 className="font-serif text-5xl md:text-7xl tracking-[0.08em] text-foreground mb-6">
            LOOKBOOK
          </h2>
          <div className="flex items-center gap-6">
            <span className="h-px w-24 bg-gradient-to-r from-champagne to-transparent" />
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Scroll to explore →
            </p>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <motion.div
        ref={scrollRef}
        className="gallery-scroll pl-8 md:pl-24"
        style={{ x: xTransform }}
      >
        {lookbookItems.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
        
        {/* End card */}
        <div className="flex-shrink-0 flex items-center justify-center w-[300px] h-[70vh]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="block text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              Full Collection
            </span>
            <button className="btn-luxury">
              View All
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[20vw] font-serif text-foreground/[0.02] tracking-[0.2em] pointer-events-none whitespace-nowrap">
        SWAGA
      </div>
    </section>
  );
};

export default LookbookGallery;
