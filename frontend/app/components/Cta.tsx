import { PortableTextBlock } from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import { stegaClean } from '@sanity/client/stega'
import { ExtractPageBuilderType } from '@/sanity/lib/types'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'

type CtaProps = {
  block: ExtractPageBuilderType<'callToAction'>
  index: number
  pageType: string
  pageId: string
}

export default function CTA({ block }: CtaProps) {
  const { heading, eyebrow, body = [], button, image, theme, contentAlignment } = block

  const isDark = theme === 'dark'
  const isImageFirst = stegaClean(contentAlignment) === 'imageFirst'

  return (
    <section className={`relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Texture Overlay */}
      <div className={`absolute inset-0 bg-[size:5px] opacity-25 pointer-events-none ${isDark ? 'bg-[url(/images/tile-1-black.png)]' : 'bg-[url(/images/tile-1-white.png)]'
        }`} />

      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 py-12 items-center">

          {/* Content Side */}
          <div className={`${isImageFirst && image ? 'row-start-2 lg:row-start-1 lg:col-start-2' : ''} flex flex-col gap-4`}>
            {eyebrow && (
              <span className="text-sm uppercase font-mono tracking-tight opacity-70">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{heading}</h2>
            )}
            {body && (
              <div className="prose dark:prose-invert">
                <PortableText value={body as PortableTextBlock[]} />
              </div>
            )}

            {button?.buttonText && button?.link && (
              <div className="mt-4">
                <ResolvedLink
                  link={button?.link}
                  className={`inline-flex items-center gap-2 rounded-full py-3 px-6 text-sm font-mono transition-colors duration-200 
                    ${isDark
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                  {button?.buttonText}
                </ResolvedLink>
              </div>
            )}
          </div>

          {/* Image Side */}
          {image?.asset?._ref && (
            <div className="relative h-64 lg:h-96 w-full rounded-sm overflow-hidden shadow-lg">
              <Image
                src={urlForImage(image).url()}
                alt={(image as any).alt || "CTA Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}