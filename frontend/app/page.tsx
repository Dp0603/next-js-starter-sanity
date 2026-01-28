import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'
// import InteractiveGlobe from "./components/sections/InteractiveGlobe";
import LogisticsGlobe from "./components/sections/LogisticsGlobe";

// 1. Define Query
const LOCATIONS_QUERY = `*[_type == "location"]{
  name,
  type,
  "lat": coordinates.lat,
  "lng": coordinates.lng,
  "image": image.asset->url
}`

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: '/' },
    stega: false,
  })
  return {
    title: data?.name,
    description: data?.heading,
  }
}

export default async function Page() {
  // 2. Fetch Page Content
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: '/' },
  })

  // 3. Fetch Globe Locations ( 👇 THIS WAS MISSING )
  const { data: locationData } = await sanityFetch({
    query: LOCATIONS_QUERY,
    params: {},
  })

  if (!data) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      {data.pageBuilder ? <BlockRenderer blocks={data.pageBuilder} /> : null}

      {/* <InteractiveGlobe /> */}
      <LogisticsGlobe locations={locationData} />
    </div>
  )
}