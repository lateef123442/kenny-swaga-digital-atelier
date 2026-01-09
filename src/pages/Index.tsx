import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import BrandStatement from '@/components/BrandStatement';
import LookbookGallery from '@/components/LookbookGallery';
import AtelierSection from '@/components/AtelierSection';
import Footer from '@/components/Footer';
import MagneticCursor from '@/components/MagneticCursor';
import SmoothScroll from '@/components/SmoothScroll';

const Index = () => {
  return (
    <SmoothScroll>
      {/* Custom cursor - hidden on touch devices */}
      <div className="hidden lg:block">
        <MagneticCursor />
      </div>
      
      <Navigation />
      
      <main className="cursor-none lg:cursor-none">
        <HeroSection />
        <BrandStatement />
        <section id="lookbook">
          <LookbookGallery />
        </section>
        <section id="atelier">
          <AtelierSection />
        </section>
      </main>
      
      <Footer />
    </SmoothScroll>
  );
};

export default Index;
