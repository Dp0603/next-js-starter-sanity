import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const clientLogoSection = defineType({
  name: 'clientLogoSection',
  title: 'Client Logo Cloud',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Trusted by Global Brands',
    }),
    defineField({
      name: 'logos',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'name', title: 'Client Name', type: 'string'})],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      logos: 'logos',
    },
    prepare({title, logos}) {
      return {
        title: title || 'Logo Cloud',
        subtitle: `${logos?.length || 0} logos`,
        media: UsersIcon,
      }
    },
  },
})
