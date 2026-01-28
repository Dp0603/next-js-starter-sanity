import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const productShowcase = defineType({
  name: 'productShowcase',
  title: 'Product Showcase (Zig-Zag)',
  type: 'object',
  icon: TagIcon,
  fields: [
    // Top Section
    defineField({
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'string', 
      initialValue: 'THE COLLECTION',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heading', 
      title: 'Heading', 
      type: 'string', 
      initialValue: 'CORE COMPETENCIES.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description', 
      title: 'Main Description', 
      type: 'text', 
      rows: 3
    }),

    // The List of Products
    defineField({
      name: 'products',
      title: 'Product Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Product Category',
          fields: [
            defineField({
                name: 'number', 
                title: 'Number (e.g. 01)', 
                type: 'string',
                validation: (Rule) => Rule.required().max(2)
            }),
            defineField({
                name: 'title', 
                title: 'Title', 
                type: 'string', 
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'description', 
                title: 'Description', 
                type: 'text', 
                rows: 4,
                validation: (Rule) => Rule.required().max(300).warning('Keep descriptions short for better design.')
            }),
            
            // Specific Business Data (From PDF)
            defineField({
                name: 'moq', 
                title: 'MOQ Guidance', 
                type: 'string', 
                placeholder: 'e.g. 300 units / style'
            }),
            defineField({
                name: 'leadTime', 
                title: 'Lead Time', 
                type: 'string', 
                placeholder: 'e.g. 45-60 Days'
            }),

            defineField({
              name: 'features',
              title: 'Key Features (Bullet Points)',
              type: 'array',
              of: [{type: 'string'}],
            }),
            
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              description: 'Upload a high-quality 4:3 or 1:1 image.',
              options: {hotspot: true},
              validation: (Rule) => Rule.required()
            }),
            
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Inquire Now',
            }),
            defineField({name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/contact'}),
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
      return {title: title || 'Product Showcase', media: TagIcon}
    },
  },
})