import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'
import LogisticsGlobe from './components/sections/LogisticsGlobe'

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
    params: { slug: '/' },
    stega: false,
  })

  return {
    title: data?.name ?? 'Home',
    description: data?.heading ?? '',
  }
}

export default async function Page() {
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: '/' },
  })

  const { data: locationData } = await sanityFetch({
    query: LOCATIONS_QUERY,
  })

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer
        // Guard against null for the array
        blocks={data.pageBuilder ?? []}
        // This will now pass the build because the prop accepts 'null'
        legalType={data.legalType}
      />

      <LogisticsGlobe locations={locationData ?? []} />
    </div>
  )
}