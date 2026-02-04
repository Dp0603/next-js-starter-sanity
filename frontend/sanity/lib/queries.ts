import {defineQuery} from 'next-sanity'

// --- 1. Helper Fragments ---
const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
  }
`

// --- 2. Main Page Query ---
export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    legalType,
    
    seo {
      metaTitle,
      metaDescription,
      openGraphImage {
        asset->{
          url
        }
      }
    },

    "pageBuilder": pageBuilder[]{
      ...,
      
      // Call to Action
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },

      // Rich Text Info
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },

      // Product Categories (Lookbook)
      _type == "productLookbook" => {
        ...,
        products[]->{
          _id,
          title,
          description,
          image,
          features
        }
      },

      // Product Detailed List (Showcase)
      _type == "productShowcase" => {
        ...,
        products[]{
          _id,
          title,
          description,
          image,
          features,
          moq,
          leadTime,
          buttonText,
          buttonLink
        }
      },

      // Product Grid (3-Col)
      _type == "productGrid" => {
        _type,
        heading,
        description,
        products[]->{
          _id,
          title,
          description,
          image,
          moq,
          leadTime,
          features
        }
      },
      
      // 1. Quality Standards (Grid)
      _type == "qualityStandards" => {
        _type,
        subtitle,
        heading,
        description,
        features[]{
          title,
          description,
          icon
        }
      },

      // 2. Quality Ethics (Split Section)
      _type == "qualityEthics" => {
        _type,
        layout,
        subtitle,
        heading,
        description,
        checklist,
        image {
          asset->{url},
          alt
        }
      },

      // Locations / Map Data
      _type == "locationSection" => {
        ...,
        locations[]{
          ...,
          image {
            asset->{url} 
          }
        }
      },

      // Brand Case Studies
      _type == "brandShowcase" => { 
        ...,
        brands[]{
          _id,
          name,
          description,
          website,
          color,
          image { asset->{url} },
          logo { asset->{url} }
        }
      },

      // Client Logo Cloud
      _type == "clientLogoSection" => {
        _type,
        heading,
        logos[]{
          name,
          asset->{url}
        }
      },

      // --- CONTACT SECTION FIX ---
      _type == "contactSection" => { 
        ...
      },

      // --- ABOUT PAGE SECTIONS ---
      _type == "aboutHero" => {
        _type,
        layout,
        subtitle,
        heading,
        description,
        quote,
        quoteAuthor,
        statNumber,
        statLabel,
        image {
          asset->{url},
          alt
        }
      },

      _type == "founderNote" => {
        _type,
        heading,
        quote,
        author,
        role,
        image { asset->{url} }
      },

      _type == "philosophySection" => {
        _type,
        heading,
        subheading,
        description,
        features,
        ctaText,
        ctaLink,
        image {
          asset->{url},
          alt
        }
      },
      
      _type == "gallerySection" => {
        _type,
        heading,
        subtitle,
        items[]{
            title,
            description,
            link,
            image { asset->{url} }
        }
      },

      _type == "workflowSection" => {
        _type,
        heading,
        description,
        steps[]{
          stepNumber,
          title,
          description,
          image { asset->{url} }
        }
      },

      _type == "richTextSection" => {
        _type,
        title,
        lastUpdated,
        introduction,
        containerWidth,
        legalType,
        legalSections,
        content[]{
          ...,
          _type == "image" => {
            ...,
            asset->
          }
        }
      },

      _type == "resourceSection" => {
        _type,
        heading,
        eyebrow,          
        description,
        formTitle,        
        formDescription,  
        formButtonText,   
        successTitle,     
        successMessage,   
        resources[] {
          title,
          description,
          type,
          "size": file.asset->size,
          isGated,
          "fileUrl": file.asset->url 
        }
      }
    }
  }
`)

// --- 3. Other Queries ---

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    logo {
      useCustomUrl,
      logoUrl,
      logoImage { asset->{url, metadata} },
      logoMobileUrl,
      logoMobileImage { asset->{url, metadata} }, 
      alt
    },
    headerMenu,
    footerDescription,
    contactEmail,
    locations[]{
      city,
      address
    },
    socialLinks[]{ 
      platform, 
      url 
    },
    "profileUrl": companyProfile.asset->url,
    copyrightText,
    legalLinks[]{
      label,
      url
    },
    certificationsText 
  }
`)
