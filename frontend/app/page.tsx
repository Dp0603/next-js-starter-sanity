import { type Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'
import dynamic from 'next/dynamic'

// 🚀 OPTIMIZATION: Lazy load the heavy 3D Globe component
// This reduces the initial bundle size significantly (~500KB+ depending on the library)
const LogisticsGlobe = dynamic(() => import('./components/sections/LogisticsGlobe'), {
  ssr: false, // 3D libraries often need window access, and SSRing them is heavy/useless
  loading: () => <div className="h-[800px] bg-[#0f1b2d] border-y border-white/10 animate-pulse" />
})

const HOME_SLUG = '/';

const LOCATIONS_QUERY = `*[_type == "location"]{
  _id,
  name,
  type,
  "lat": coordinates.lat,
  "lng": coordinates.lng,
  "image": image.asset->url
}`

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: HOME_SLUG },
    stega: false,
  })

  const title = data?.seo?.metaTitle || "Home | Akaame Exports Pvt. Ltd.";
  const description = data?.seo?.metaDescription || data?.heading || "Global leaders in premium export quality products.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: data?.seo?.openGraphImage?.asset?.url
        ? [{ url: data.seo.openGraphImage.asset.url }]
        : [],
    },
  }
}

export default async function Page() {
  // 🚀 OPTIMIZATION: Fetch Page Data and Locations in Parallel
  // This makes the homepage load faster by not waiting for one request to finish before starting the next.
  const [pageResponse, locationsResponse] = await Promise.all([
    sanityFetch({ query: getPageQuery, params: { slug: HOME_SLUG } }),
    sanityFetch({ query: LOCATIONS_QUERY }),
  ]);

  const data = pageResponse.data;
  const locationData = locationsResponse.data;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p>The code is looking for a page with slug <code>&quot;/&quot;</code>.</p>
          <p className="text-sm text-gray-400 mt-2">Please check your Sanity dashboard to ensure the Home page has exactly this slug.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. CMS Content (Hero, Stats, etc.) */}
      <BlockRenderer
        blocks={data.pageBuilder ?? []}
        legalType={data.legalType}
      />

      {/* 2. Global Logistics Map (Hardcoded at bottom for now) */}
      <LogisticsGlobe locations={locationData ?? []} />
    </div>
  )
}