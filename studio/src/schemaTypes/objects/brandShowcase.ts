import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const brandShowcase = defineType({
  name: 'brandShowcase',
  title: 'Brand Showcase (Portfolio)',
  type: 'object',
  icon: StarIcon,
  fields: [
    // Page Header
    defineField({
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'string', 
      initialValue: 'OUR PORTFOLIO',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heading', 
      title: 'Heading', 
      type: 'string', 
      initialValue: 'PROVEN TRACK RECORD.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description', 
      title: 'Intro Text', 
      type: 'text', 
      rows: 3
    }),

    // The Brands
    defineField({
      name: 'brands',
      title: 'Brands List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Brand',
          fields: [
            defineField({
                name: 'name', 
                title: 'Brand Name', 
                type: 'string', 
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'logo', 
                title: 'Brand Logo (PNG)', 
                type: 'image', 
                description: 'Transparent PNG recommended.',
                validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Lifestyle Image',
              type: 'image',
              description: 'High-quality vertical (4:5) or square (1:1) shot.',
              options: {hotspot: true},
              validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'description', 
                title: 'Brand Story', 
                type: 'text', 
                rows: 4
            }),
            defineField({
                name: 'website', 
                title: 'Website Link', 
                type: 'url',
                validation: (Rule) => Rule.uri({scheme: ['http', 'https']})
            }),
            defineField({
              name: 'color',
              title: 'Brand Accent Color (Hex)',
              type: 'string',
              description: 'e.g. #D4AF37. Used for the brand name highlight.',
              validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                name: 'hex', // Error message if regex fails
                invert: false
              }).error('Must be a valid Hex code (e.g. #FF0000)')
            }),
          ],
          preview: {
            select: {title: 'name', media: 'logo'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Brand Showcase', media: StarIcon}
    },
  },
})