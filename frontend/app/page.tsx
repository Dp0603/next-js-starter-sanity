import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'
// import InteractiveGlobe from "./components/sections/InteractiveGlobe";
import LogisticsGlobe from "./components/sections/LogisticsGlobe";

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
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: '/' },
  })

  if (!data) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      {data.pageBuilder ? <BlockRenderer blocks={data.pageBuilder} /> : null}

      {/* <InteractiveGlobe /> */}
      <LogisticsGlobe />
    </div>
  )
}