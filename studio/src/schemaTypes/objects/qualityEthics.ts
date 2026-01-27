import {defineField, defineType} from 'sanity'

export const qualityEthics = defineType({
  name: 'qualityEthics',
  title: 'Quality Ethics (Split)',
  type: 'object',
  fields: [
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'checklist',
      title: 'Checklist Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'image', title: 'Side Image', type: 'image', options: {hotspot: true}}),
  ],
})
