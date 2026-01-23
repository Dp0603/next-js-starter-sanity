import {defineField, defineType} from 'sanity'

export const locationSection = defineType({
  name: 'locationSection',
  title: 'Locations Section',
  type: 'object',
  fields: [
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label (e.g. Manufacturing Hub)'}),
            defineField({name: 'city', type: 'string', title: 'City (e.g. DELHI, INDIA)'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
            defineField({
              name: 'features',
              type: 'array',
              of: [{type: 'string'}],
              title: 'Bullet Points',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'locations.0.city'},
    prepare({title}) {
      return {title: 'Locations Grid', subtitle: title ? `Starts with ${title}` : ''}
    },
  },
})
