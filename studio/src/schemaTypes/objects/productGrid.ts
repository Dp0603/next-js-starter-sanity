import {defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

export const productGrid = defineType({
  name: 'productGrid',
  title: 'Product Grid (3-Col)',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Featured Collection',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'products',
      title: 'Select Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      products: 'products',
    },
    prepare({title, products}) {
      return {
        title: title || 'Product Grid',
        subtitle: `${products?.length || 0} items`,
        media: ThLargeIcon,
      }
    },
  },
})
