import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/prdouct'
import {inquiry} from './documents/inquiry'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {siteSettings} from './singletons/siteSettings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {hero} from './objects/hero'
import {stats} from './objects/stats'
import {productCategory} from './documents/productCategory'
import {productLookbook} from './objects/productLookbook'
import {services} from './objects/services'
import {ctaSection} from './objects/ctaSection'
import {aboutHero} from './objects/aboutHero'
import {philosophySection} from './objects/philosophySection'
import {locationSection} from './objects/locationSection'
import {gallerySection} from './objects/gallerySection'
import {founderNote} from './objects/founderNote'
import {workflowSection} from './objects/workflowSection'
import {infrastructureSection} from './objects/infrastructureSection'
import {productShowcase} from './objects/productShowcase'
import {productGrid} from './objects/productGrid'
import {qualityStandards} from './objects/qualityStandards'
import {qualityEthics} from './objects/qualityEthics'
import {contactSection} from './objects/contactSection'
import {brandShowcase} from './objects/brandShowcase'
import {clientLogoSection} from './objects/clientLogoSection'
import {richTextSection} from './objects/richTextSection'
import {location} from './documents/location'
import {seo} from './objects/seo'
import {resourceSection} from './objects/resourceSection'



export const schemaTypes = [
  // Singletons
  //Home page
  hero,
  stats,
  ctaSection,
  
  
  richTextSection,
  //About page
  aboutHero,
  philosophySection,
  brandShowcase,
  locationSection,
  gallerySection,
  founderNote,
  
  
  //Capabilities page
  workflowSection,
  services,
  infrastructureSection,


  //Products page
  productCategory,
  productLookbook,
  productShowcase,
  productGrid,
  
  
  //Brands
  clientLogoSection,



  //Quality & Compliance page
  qualityStandards,
  qualityEthics,
  
  
  
  //Contact page
  contactSection,


  siteSettings,
  resourceSection,


  page,
  post,
  inquiry,
  person,
  product,
  button,
  blockContent,
  blockContentTextOnly,
  callToAction,
  link,
  infoSection,
  location,
  seo,
]



