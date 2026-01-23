import {defineField, defineType} from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'title',
              title: 'Title', // e.g. "VELARA"
              type: 'string',
            }),
            // 👇 This is the new field for the paragraph text
            defineField({
              name: 'description',
              title: 'Description', // e.g. "Contemporary leather footwear..."
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'link',
              title: 'Link (Optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
})
