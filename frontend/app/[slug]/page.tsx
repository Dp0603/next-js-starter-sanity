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

  if (!data) return { title: 'Page Not Found' }

  const title = data.seo?.metaTitle || `${data.name} | Akaame Exports`;

  const description = data.seo?.metaDescription || data.heading || "Global leaders in premium export quality products.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      // If you uploaded a share image, use it.
      images: data.seo?.openGraphImage?.asset?.url
        ? [{ url: data.seo.openGraphImage.asset.url }]
        : [],
    },
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
      <BlockRenderer
        blocks={data.pageBuilder}
        legalType={data.legalType}
      />
    </div>
  )
}