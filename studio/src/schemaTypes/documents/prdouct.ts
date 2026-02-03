import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product / Catalog Item',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    // --- B2B DATA (Crucial for the Grid) ---
    defineField({
      name: 'moq',
      title: 'MOQ Guidance',
      type: 'string',
      placeholder: 'e.g. 50 pairs / color',
      description: 'Minimum Order Quantity for this specific style.',
    }),
    defineField({
      name: 'leadTime',
      title: 'Estimated Lead Time',
      type: 'string',
      placeholder: 'e.g. 45-60 Days',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'e.g. "Full Grain Leather", "Hand-Stitched", "Vibram Sole"',
    }),

    // --- CATEGORY ---
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Footwear', value: 'footwear'},
          {title: 'Bags & Luggage', value: 'bags'},
          {title: 'Small Leather Goods', value: 'accessories'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
