import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/app/components/BlockRenderer'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug },
    stega: false,
  })
  return {
    title: data?.name,
    description: data?.heading,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: getPageQuery,
    params: { slug },
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