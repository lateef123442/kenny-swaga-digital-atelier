import senatorWhite from '@/assets/senator-white.jpg';
import senatorBlue from '@/assets/senator-blue.jpg';
import senatorBlack from '@/assets/senator-black.jpg';
import ankaraModern from '@/assets/ankara-modern.jpg';
import agbadaCream from '@/assets/agbada-cream.jpg';
import senatorWine from '@/assets/senator-wine.jpg';
import senatorOlive from '@/assets/senator-olive.jpg';
import ankaraBlazer from '@/assets/ankara-blazer.jpg';

export interface Product {
  id: number;
  slug: string;
  images: string[];
  name: string;
  category: string;
  price: string;
  subtitle: string;
  description: string;
  sizes: string[];
  details: string[];
  fabric: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'royal-senator-white',
    images: [senatorWhite, senatorBlue, senatorBlack],
    name: '"ROYAL WHITE"',
    category: 'Senator',
    price: '₦35,000',
    subtitle: 'Premium Senator Suit',
    description: 'An exquisite white senator suit crafted from premium Italian cotton with intricate gold embroidery. This masterpiece embodies Nigerian elegance with contemporary luxury tailoring.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Hand-stitched gold embroidery', 'Italian cotton blend', 'Matching cap included', 'Custom tailoring available'],
    fabric: '100% Premium Italian Cotton'
  },
  {
    id: 2,
    slug: 'azure-senator-blue',
    images: [senatorBlue, senatorWhite, senatorWine],
    name: '"AZURE"',
    category: 'Senator',
    price: '₦30,000',
    subtitle: 'Royal Blue Senator',
    description: 'A commanding royal blue senator suit featuring gold button accents and traditional cap. Perfect for distinguished occasions where presence matters.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Gold button detailing', 'Premium silk blend', 'Traditional cap included', 'Bespoke fitting'],
    fabric: 'Silk-Cotton Blend'
  },
  {
    id: 3,
    slug: 'midnight-senator-black',
    images: [senatorBlack, senatorBlue, senatorOlive],
    name: '"MIDNIGHT"',
    category: 'Senator',
    price: '₦33,000',
    subtitle: 'Black Kaftan Suite',
    description: 'An elegant black kaftan-style senator with silver embroidery, representing the pinnacle of Nigerian menswear sophistication.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Silver thread embroidery', 'Premium wool blend', 'Matching cap & pants', 'Hand-finished details'],
    fabric: 'Cashmere-Wool Blend'
  },
  {
    id: 4,
    slug: 'ankara-fusion',
    images: [ankaraModern, ankaraBlazer, agbadaCream],
    name: '"HERITAGE"',
    category: 'Ankara',
    price: '₦25,000',
    subtitle: 'Modern Ankara Set',
    description: 'A bold contemporary interpretation of traditional Ankara, featuring vibrant geometric patterns that celebrate African heritage with modern design sensibility.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Premium Ankara fabric', 'Modern tailored fit', 'Matching accessories available', 'Machine washable'],
    fabric: '100% Premium Ankara Cotton'
  },
  {
    id: 5,
    slug: 'agbada-regal',
    images: [agbadaCream, senatorWhite, senatorWine],
    name: '"REGAL"',
    category: 'Agbada',
    price: '₦30,000',
    subtitle: 'Ceremonial Agbada',
    description: 'The ultimate expression of Nigerian royal fashion. This cream agbada features elaborate gold embroidery and flowing silhouette perfect for grand occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Elaborate gold embroidery', 'Three-piece set', 'Hand-woven fabric', 'Royal ceremonial style'],
    fabric: 'Hand-woven Cotton Damask'
  },
  {
    id: 6,
    slug: 'senator-wine',
    images: [senatorWine, senatorBlue, senatorBlack],
    name: '"BORDEAUX"',
    category: 'Senator',
    price: '₦35,000',
    subtitle: 'Wine Senator Suite',
    description: 'A sophisticated wine-colored senator that exudes refined taste. The deep burgundy tone paired with subtle detailing creates an unforgettable presence.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Deep wine coloring', 'Premium fabric blend', 'Matching cap included', 'Slim-fit design'],
    fabric: 'Premium Wool Blend'
  },
  {
    id: 7,
    slug: 'senator-olive',
    images: [senatorOlive, senatorBlack, senatorWine],
    name: '"EMERALD"',
    category: 'Senator',
    price: '₦30,000',
    subtitle: 'Olive Senator Suite',
    description: 'A distinctive olive green senator that sets you apart. The earthy tone combined with premium tailoring creates sophisticated elegance.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Unique olive shade', 'Subtle pattern detail', 'Cap and pants set', 'Relaxed luxury fit'],
    fabric: 'Linen-Cotton Blend'
  },
  {
    id: 8,
    slug: 'ankara-executive',
    images: [ankaraBlazer, ankaraModern, senatorBlue],
    name: '"FUSION"',
    category: 'Ankara',
    price: '₦33,000',
    subtitle: 'Ankara Executive Blazer',
    description: 'Where African heritage meets corporate elegance. This Ankara patchwork blazer redefines power dressing with cultural pride.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: ['Patchwork design', 'Blazer & trouser set', 'Contemporary cut', 'Statement piece'],
    fabric: 'Premium Ankara with Italian Lining'
  }
];

export const categories = ['All', 'Senator', 'Ankara', 'Agbada'];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};
