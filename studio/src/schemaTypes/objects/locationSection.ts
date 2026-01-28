import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons'

export const locationSection = defineType({
  name: 'locationSection',
  title: 'Locations Grid',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'locations',
      title: 'Locations List',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'label', 
                type: 'string', 
                title: 'Label', 
                placeholder: 'e.g. Manufacturing Hub',
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'city', 
                type: 'string', 
                title: 'City', 
                placeholder: 'e.g. AHMEDABAD, INDIA',
                validation: (Rule) => Rule.required().uppercase()
            }),
            defineField({
                name: 'description', 
                type: 'text', 
                title: 'Address / Description', 
                rows: 3
            }),
            defineField({
              name: 'image',
              title: 'Location Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'features',
              type: 'array',
              of: [{type: 'string'}],
              title: 'Key Stats (Bullets)',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'locations.0.city'},
    prepare({title}) {
      return {title: 'Locations Grid', subtitle: title ? `Starts with ${title}` : '', media: EarthGlobeIcon}
    },
  },
})