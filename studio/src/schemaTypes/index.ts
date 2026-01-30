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
import {location} from './documents/location'
import {seo} from './objects/seo'


export const schemaTypes = [
  // Singletons
  //Home page
  hero,
  stats,
  brandShowcase,
  philosophy,
  ctaSection,
  
  
  //About page
  aboutHero,
  richTextSection,
  locationSection,
  gallerySection,
  
  
  
  //Capabilities page
  workflowSection,
  services,
  infrastructureSection,


  //Products page
  productCategory,
  productLookbook,
  productShowcase,
  
  
  //Brands



  //Quality & Compliance page
  qualityStandards,
  qualityEthics,
  
  
  
  //Contact page
  contactSection,


  siteSettings,


  page,
  post,
  person,
  button,
  blockContent,
  blockContentTextOnly,
  callToAction,
  link,
  infoSection,
  location,
  seo,
]



