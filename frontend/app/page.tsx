import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug: 'home' },
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
    params: { slug: 'home' },
  })

  if (!data) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      {data.pageBuilder ? <BlockRenderer blocks={data.pageBuilder} /> : null}
    </div>
  )
}