import {defineField, defineType} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string', // e.g. "READY TO SCALE?"
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'CTA Section', subtitle: 'Call to Action'}
    },
  },
})
