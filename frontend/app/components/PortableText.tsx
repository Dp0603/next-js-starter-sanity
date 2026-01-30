import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import { urlForImage } from '@/sanity/lib/utils' // 👈 Import Sanity URL builder
import Image from 'next/image' // 👈 Use Next.js Image

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }

        return (
          <figure className="my-8 relative w-full h-auto">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || 'Content Image'}
              width={800} // Standard width for blog content
              height={500} // Approximate aspect ratio, prevents layout shift
              className="rounded-sm object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px" // Responsive sizes
            />
            {value.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
    block: {
      h1: ({ children, value }) => (
        <h1 className="group relative scroll-mt-24" id={value?._key}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"
          >
            #
          </a>
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2 className="group relative scroll-mt-24" id={value?._key}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"
          >
            #
          </a>
        </h2>
      ),
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div className={`prose prose-a:text-brand dark:prose-invert max-w-none ${className}`}>
      <PortableText components={components} value={value} />
    </div>
  )
}