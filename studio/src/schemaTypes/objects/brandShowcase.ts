import {defineField, defineType} from 'sanity'

export const brandShowcase = defineType({
  name: 'brandShowcase',
  title: 'Brand Showcase',
  type: 'object',
  fields: [
    // Page Header
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'OUR PORTFOLIO',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'PROVEN TRACK RECORD.',
    }),
    defineField({name: 'description', title: 'Intro Text', type: 'text'}),

    // The Brands
    defineField({
      name: 'brands',
      title: 'Brands List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Brand',
          fields: [
            defineField({name: 'name', title: 'Brand Name', type: 'string'}),
            defineField({name: 'logo', title: 'Brand Logo', type: 'image'}),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'description', title: 'Brand Story', type: 'text'}),
            defineField({name: 'website', title: 'Website Link', type: 'url'}),
            defineField({
              name: 'color',
              title: 'Brand Accent Color (Hex)',
              type: 'string',
              description: 'e.g. #D4AF37 for Gold',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
