import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const founderNote = defineType({
  name: 'founderNote',
  title: 'Founder Note',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Leadership',
    }),
    defineField({name: 'quote', title: 'The Message', type: 'text', rows: 4}),
    defineField({name: 'author', title: 'Author Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string', initialValue: 'Founder & CEO'}),
    defineField({name: 'image', title: 'Portrait', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Founder Note', media}
    },
  },
})
