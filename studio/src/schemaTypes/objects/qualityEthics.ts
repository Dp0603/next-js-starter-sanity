import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons'

export const qualityEthics = defineType({
  name: 'qualityEthics',
  title: 'Quality Ethics (Split)',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
        name: 'layout',
        title: 'Layout Direction',
        type: 'string',
        options: {
            list: [
                { title: 'Image Left / Text Right', value: 'left' },
                { title: 'Text Left / Image Right', value: 'right' }
            ],
            layout: 'radio'
        },
        initialValue: 'left'
    }),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'ETHICS'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({
      name: 'checklist',
      title: 'Checklist Items',
      description: 'Bullet points highlighting compliance or ethical features.',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
        name: 'image', 
        title: 'Side Image', 
        type: 'image', 
        options: {hotspot: true},
        validation: (Rule) => Rule.required()
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Ethics Section',
        media: HeartIcon,
      }
    }
  },
})