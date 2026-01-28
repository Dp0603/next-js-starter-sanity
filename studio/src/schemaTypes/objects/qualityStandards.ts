import {defineField, defineType} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons'

export const qualityStandards = defineType({
  name: 'qualityStandards',
  title: 'Quality Standards (Grid)',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'string', 
      initialValue: 'THE STANDARD',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heading', 
      title: 'Heading', 
      type: 'string', 
      initialValue: 'ZERO DEFECTS.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description', 
      title: 'Description', 
      type: 'text', 
      rows: 3,
      description: 'Introductory text centered above the grid.'
    }),
    defineField({
      name: 'features',
      title: 'Standard Cards',
      type: 'array',
      validation: (Rule) => Rule.min(3).max(6), // Enforce layout balance
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Shield (Vetting/Security)', value: 'shield'},
                  {title: 'Refresh (Process/Loop)', value: 'refresh'},
                  {title: 'Clipboard (Audit/Check)', value: 'clipboard'},
                  {title: 'Scale (Balance/Fairness)', value: 'scale'},
                  {title: 'Zap (Speed/Efficiency)', value: 'zap'},
                ],
              },
              initialValue: 'shield',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Quality Standards',
        media: CheckmarkCircleIcon,
      }
    }
  },
})