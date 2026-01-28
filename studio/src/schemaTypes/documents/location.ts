import { defineType, defineField } from 'sanity'
import { GeopointInput } from '../../components/GeopointInput' 

export const location = defineType({
  name: 'location',
  title: 'Globe Locations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'City Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Hub Type',
      type: 'string',
      options: {
        list: [
            { title: 'Source (Main Hub/Orange)', value: 'source' },
            { title: 'Target (Destination/White)', value: 'target' }
        ],
        layout: 'radio'
      },
      initialValue: 'target',
    }),
    // 👇 NEW FIELD ADDED HERE
    defineField({
      name: 'image',
      title: 'City Image',
      type: 'image',
      options: { hotspot: true },
      description: 'High-quality photo shown when this city is selected (Darker images work best)'
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      components: {
        input: GeopointInput // 👈 Attaching our custom button
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type'
    }
  }
})