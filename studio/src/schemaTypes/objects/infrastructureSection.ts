import {defineField, defineType} from 'sanity'

export const infrastructureSection = defineType({
  name: 'infrastructureSection',
  title: 'Infrastructure Section',
  type: 'object',
  fields: [
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}), // e.g. "OUR ARSENAL"
    defineField({name: 'heading', title: 'Heading', type: 'string'}), // e.g. "INFRASTRUCTURE."
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'cards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // We will use a dropdown to pick the icon
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Design/Pen', value: 'design'},
                  {title: 'Precision/Gear', value: 'precision'},
                  {title: 'Shield/Testing', value: 'testing'},
                ],
              },
            }),
            defineField({name: 'title', title: 'Card Title', type: 'string'}),
            defineField({name: 'description', title: 'Card Description', type: 'text'}),
          ],
        },
      ],
    }),
  ],
})
