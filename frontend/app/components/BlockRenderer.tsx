import React from 'react';
import HeroSection from '@/app/components/sections/HeroSection';
import StatsStrip from '@/app/components/sections/StatsStrip';
import PhilosophySection from '@/app/components/sections/PhilosophySection';
import ProductLookbook from '@/app/components/sections/ProductLookbook';
import ServicesSection from '@/app/components/sections/ServicesSection';
import CTASection from '@/app/components/sections/CTASection';
import AboutHero from '@/app/components/sections/AboutHero';
import LocationSection from '@/app/components/sections/LocationSection';
import GallerySection from '@/app/components/sections/GallerySection';

const Blocks: Record<string, React.FC<any>> = {
  hero: HeroSection,
  stats: StatsStrip,
  philosophy: PhilosophySection,
  productLookbook: ProductLookbook,
  services: ServicesSection,
  ctaSection: CTASection,
  aboutHero: AboutHero,
  locationSection: LocationSection,
  gallerySection: GallerySection,
};

// 2. Define the Interface to accept an Array
interface BlockRendererProps {
  blocks?: any[];
}

// 3. The Component that loops through the array
const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block) => {
        // Find the component that matches the Sanity type
        const Component = Blocks[block._type];

        // If you haven't created the component yet, skip it safely
        if (!Component) {
          // console.warn(`No component found for block type: ${block._type}`);
          return null;
        }

        // Render the component
        return <Component key={block._key} block={block} />;
      })}
    </>
  );
};

export default BlockRenderer;