import React from 'react'
import { PortableText } from '@portabletext/react'

interface RichTextSectionProps {
    block: {
        content: any[]
    }
}

const components = {
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-[#14253f]">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-[#14253f]">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-bold mb-3 mt-6 text-[#14253f]">{children}</h3>,
        normal: ({ children }: any) => <p className="mb-4 text-gray-600 leading-relaxed text-sm md:text-base">{children}</p>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-[#cd7d51] pl-4 italic my-4 text-gray-700">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-2">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 text-gray-600 space-y-2">{children}</ol>,
    },
}

const RichTextSection: React.FC<RichTextSectionProps> = ({ block }) => {
    if (!block?.content) return null

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[900px] mx-auto px-6 lg:px-12">
                {/* The 'prose' class gives standard formatting, but our components override it for your brand style */}
                <div className="prose prose-slate max-w-none">
                    <PortableText value={block.content} components={components} />
                </div>
            </div>
        </section>
    )
}

export default RichTextSection