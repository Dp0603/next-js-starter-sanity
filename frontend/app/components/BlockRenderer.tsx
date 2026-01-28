import React from 'react';
import HeroSection from '@/app/components/sections/HeroSection';
import StatsStrip from '@/app/components/sections/StatsStrip';
import ProductLookbook from '@/app/components/sections/ProductLookbook';
import ServicesSection from '@/app/components/sections/ServicesSection';
import CTASection from '@/app/components/sections/CTASection';
import AboutHero from '@/app/components/sections/AboutHero';
import LocationSection from '@/app/components/sections/LocationSection';
import PhilosophySection from '@/app/components/sections/PhilosophySection';
import GallerySection from '@/app/components/sections/GallerySection';
import WorkflowSection from '@/app/components/sections/WorkflowSection';
import InfrastructureSection from '@/app/components/sections/InfrastructureSection';
import ProductShowcase from '@/app/components/sections/ProductShowcase';
import QualityStandards from '@/app/components/sections/QualityStandards';
import QualityEthics from '@/app/components/sections/QualityEthics';
import ContactSection from '@/app/components/sections/ContactSection';
import BrandShowcase from '@/app/components/sections/BrandShowcase';
import RichTextSection from '@/app/components/sections/RichTextSection';

const Blocks: Record<string, React.FC<any>> = {
  hero: HeroSection,
  stats: StatsStrip,
  productLookbook: ProductLookbook,
  services: ServicesSection,
  ctaSection: CTASection,
  aboutHero: AboutHero,
  locationSection: LocationSection,
  philosophy: PhilosophySection,
  gallerySection: GallerySection,
  workflowSection: WorkflowSection,
  infrastructureSection: InfrastructureSection,
  productShowcase: ProductShowcase,
  qualityStandards: QualityStandards,
  qualityEthics: QualityEthics,
  contactSection: ContactSection,
  brandShowcase: BrandShowcase,
  richTextSection: RichTextSection,
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