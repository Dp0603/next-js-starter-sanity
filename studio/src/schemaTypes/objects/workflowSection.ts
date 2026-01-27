import {defineField, defineType} from 'sanity'

export const workflowSection = defineType({
  name: 'workflowSection',
  title: 'Workflow (Timeline)',
  type: 'object',
  fields: [
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}), // e.g. "THE WORKFLOW"
    defineField({name: 'heading', title: 'Heading', type: 'string'}), // e.g. "CONCEPT TO CARTON."
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'Step Number', type: 'string'}), // e.g. "01"
            defineField({name: 'title', title: 'Title', type: 'string'}), // e.g. "Consultation"
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Workflow Section'}
    },
  },
})
