import {defineField, defineType} from 'sanity'

export const productLookbook = defineType({
  name: 'productLookbook',
  title: 'Product Lookbook',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'CURATED CATEGORIES.',
    }),
    defineField({
      name: 'products', // 👇 The Magic Field
      title: 'Selected Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'productCategory'}], // Points to the doc we made in Step 1
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Product Lookbook',
        subtitle: 'Grid of product categories',
      }
    },
  },
})
