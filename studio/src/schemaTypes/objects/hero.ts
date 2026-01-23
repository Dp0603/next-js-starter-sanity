import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string', // e.g. "DEFINING EXCELLENCE"
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'text', // e.g. "Akaame Exports is the premier..."
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Begin Partnership',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string', // Can be upgraded to a reference later
      initialValue: '/contact',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Component',
        media,
      }
    },
  },
})
