import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {siteSettings} from './singletons/siteSettings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {hero} from './objects/hero'
import {stats} from './objects/stats'
import {philosophy} from './objects/philosophy'
import {productCategory} from './documents/productCategory'
import {productLookbook} from './objects/productLookbook'
import {services} from './objects/services'
import {ctaSection} from './objects/ctaSection'
import {aboutHero} from './objects/aboutHero'
import {locationSection} from './objects/locationSection'
import {gallerySection} from './objects/gallerySection'
import {workflowSection} from './objects/workflowSection'
import {infrastructureSection} from './objects/infrastructureSection'
import {productShowcase} from './objects/productShowcase'
import {qualityStandards} from './objects/qualityStandards'
import {qualityEthics} from './objects/qualityEthics'
import {contactSection} from './objects/contactSection'
import {brandShowcase} from './objects/brandShowcase'
import {richTextSection} from './objects/richTextSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  siteSettings,
  page,
  post,
  person,
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  hero,
  link,
  stats,
  philosophy,
  productCategory,
  productLookbook,
  services,
  ctaSection,
  aboutHero,
  locationSection,
  gallerySection,
  workflowSection,
  infrastructureSection,
  productShowcase,
  qualityStandards,
  qualityEthics,
  contactSection,
  brandShowcase,
  richTextSection,
]
