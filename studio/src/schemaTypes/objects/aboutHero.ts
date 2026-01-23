import {defineField, defineType} from 'sanity'

export const aboutHero = defineType({
  name: 'aboutHero',
  title: 'About Hero (Split)',
  type: 'object',
  fields: [
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'quote', title: 'Quote Text', type: 'string'}),
    defineField({name: 'quoteAuthor', title: 'Quote Author', type: 'string'}),
    defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'About Hero', subtitle: 'Split Layout', media}
    },
  },
})
