import {defineField, defineType} from 'sanity'

export const philosophy = defineType({
  name: 'philosophy',
  title: 'Philosophy Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string', // e.g., "UNCOMPROMISING STANDARDS"
    }),
    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'string', // e.g., "Our Ethos"
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    // 👇 This is the List/Array for the checkmarks
    defineField({
      name: 'features',
      title: 'Feature List',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'ctaText',
      title: 'Link Text',
      type: 'string', // e.g., "Explore Our Heritage"
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link URL',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
  },
})
