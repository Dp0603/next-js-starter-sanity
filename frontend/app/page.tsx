import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'
import LogisticsGlobe from './components/sections/LogisticsGlobe'

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
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: HOME_SLUG },
  })

  const { data: locationData } = await sanityFetch({
    query: LOCATIONS_QUERY,
  })

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
    <div className="min-h-screen">
      <BlockRenderer
        blocks={data.pageBuilder ?? []}
        legalType={data.legalType}
      />
      <LogisticsGlobe locations={locationData ?? []} />
    </div>
  )
}