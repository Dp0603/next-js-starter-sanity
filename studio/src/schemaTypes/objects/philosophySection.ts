import {defineField, defineType} from 'sanity'
import {SunIcon} from '@sanity/icons'

export const philosophySection = defineType({
  name: 'philosophySection',
  title: 'Philosophy (Split Section)',
  type: 'object',
  icon: SunIcon,
  fields: [
    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'OUR ETHOS',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'UNCOMPROMISING STANDARDS',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    // The Checklist
    defineField({
      name: 'features',
      title: 'Checklist Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      title: 'Side Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'ctaText',
      title: 'Link Text',
      type: 'string',
      initialValue: 'EXPLORE OUR HERITAGE',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link URL',
      type: 'string',
      initialValue: '/about',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({title, media}) {
      return {title: title || 'Philosophy Section', media}
    },
  },
})
