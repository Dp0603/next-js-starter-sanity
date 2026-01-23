import {defineField, defineType} from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string', // e.g. "ENGINEERED PROCESS."
    }),
    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'string', // e.g. "How We Work"
    }),
    defineField({
      name: 'description',
      title: 'Main Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'serviceItems',
      title: 'Service Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Service Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'PenTool', value: 'PenTool'},
                  {title: 'Factory', value: 'Factory'},
                  {title: 'ShieldCheck', value: 'ShieldCheck'},
                  {title: 'Truck', value: 'Truck'},
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
    prepare({title}) {
      return {title: title || 'Services Section', subtitle: 'List of services'}
    },
  },
})
