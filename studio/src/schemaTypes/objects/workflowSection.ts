import {defineField, defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export const workflowSection = defineType({
  name: 'workflowSection',
  title: 'Workflow (Timeline)',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
        name: 'subtitle', 
        title: 'Subtitle', 
        type: 'string', 
        initialValue: 'THE PROCESS',
        validation: (Rule) => Rule.required()
    }),
    defineField({
        name: 'heading', 
        title: 'Heading', 
        type: 'string', 
        initialValue: 'CONCEPT TO CARTON.',
        validation: (Rule) => Rule.required()
    }),
    defineField({
        name: 'description', 
        title: 'Description', 
        type: 'text', 
        rows: 3
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      description: 'Add 4-5 steps for the best layout.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'number', 
                title: 'Step Number', 
                type: 'string', 
                placeholder: '01',
                validation: (Rule) => Rule.required().max(2).error('Use "01", "02" format')
            }),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Workflow Timeline', media: OlistIcon}
    },
  },
})