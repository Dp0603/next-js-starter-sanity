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

interface BlockRendererProps {
  blocks?: any[];
  legalType?: 'privacy' | 'terms';
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, legalType }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = Blocks[block._type];
        if (!Component) return null;

        if (block._type === 'richTextSection') {
          return (
            <Component
              key={block._key}
              block={{
                ...block,
                legalType,
              }}
            />
          );
        }

        return <Component key={block._key} block={block} />;
      })}
    </>
  );
};

export default BlockRenderer;
