import {defineField, defineType} from 'sanity'

export const productShowcase = defineType({
  name: 'productShowcase',
  title: 'Product Showcase (Zig-Zag)',
  type: 'object',
  fields: [
    // Top Section
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}), // e.g. "THE COLLECTION"
    defineField({name: 'heading', title: 'Heading', type: 'string'}), // e.g. "CORE COMPETENCIES."
    defineField({name: 'description', title: 'Main Description', type: 'text'}),

    // The List of Products
    defineField({
      name: 'products',
      title: 'Products List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Product',
          fields: [
            defineField({name: 'number', title: 'Number (e.g. 01)', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({
              name: 'features',
              title: 'Features (Bullet Points)',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Inquire Now',
            }),
            defineField({name: 'buttonLink', title: 'Button Link', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Product Showcase'}
    },
  },
})
