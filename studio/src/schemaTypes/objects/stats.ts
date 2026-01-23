import {defineField, defineType} from 'sanity'

export const stats = defineType({
  name: 'stats',
  title: 'Stats Strip',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stat Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}), // e.g. "15+"
            defineField({name: 'label', title: 'Label', type: 'string'}), // e.g. "Global Markets"
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Globe', value: 'Globe'},
                  {title: 'Award', value: 'Award'},
                  {title: 'Factory', value: 'Factory'},
                  {title: 'Users', value: 'Users'},
                  {title: 'Leaf', value: 'Leaf'},
                  {title: 'Shield', value: 'ShieldCheck'},
                ],
              },
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Stats Strip', subtitle: 'Statistics Bar'}
    },
  },
})
