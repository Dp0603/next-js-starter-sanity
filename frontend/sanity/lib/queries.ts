import {defineQuery} from 'next-sanity'

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

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    legalType,
    
    // 👇 1. SEO BLOCK (Critical for Tab Title & Google)
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
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
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
      
      // 👇 2. GLOBE DATA (Critical for the 3D Map)
      _type == "locationSection" => {
        ...,
        locations[]{
          ...,
          image {
            asset->{url} 
          }
        }
      },

      // 👇 3. BRAND SHOWCASE (Critical Fix: The arrow -> fetches actual data)
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

      _type == "contactSection" => { 
        ... 
      },
    },
  }
`)

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
    headerMenu,
    footerDescription,
    contactEmail,
    locations,
    // 👇 Explicitly fetching platform so Footer icons work
    socialLinks[]{
      platform,
      url
    },
    "profileUrl": companyProfile.asset->url,
    copyrightText,
    legalLinks,
    certificationsText 
  }
`)
