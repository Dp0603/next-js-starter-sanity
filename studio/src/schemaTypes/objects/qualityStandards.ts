import {defineField, defineType} from 'sanity'

export const qualityStandards = defineType({
  name: 'qualityStandards',
  title: 'Quality Standards (Icons)',
  type: 'object',
  fields: [
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}), // e.g. "THE STANDARD"
    defineField({name: 'heading', title: 'Heading', type: 'string'}), // e.g. "ZERO DEFECTS."
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'features',
      title: 'Three Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Shield (Vetting)', value: 'shield'},
                  {title: 'Refresh/Loop (Process)', value: 'refresh'},
                  {title: 'Clipboard (Audit)', value: 'clipboard'},
                ],
              },
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
