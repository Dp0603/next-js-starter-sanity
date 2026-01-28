import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Grid',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
        name: 'subtitle', 
        title: 'Subtitle', 
        type: 'string', 
        initialValue: 'GALLERY',
        validation: (Rule) => Rule.required()
    }),
    defineField({
        name: 'heading', 
        title: 'Heading', 
        type: 'string', 
        initialValue: 'INSIDE AKAAME.',
        validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          fields: [
            defineField({
                name: 'image', 
                title: 'Image', 
                type: 'image', 
                options: {hotspot: true},
                validation: (Rule) => Rule.required()
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({
                name: 'description', 
                title: 'Short Description', 
                type: 'text', 
                rows: 2,
                description: 'Appears on hover. Keep strictly under 15 words.'
            }),
            defineField({name: 'link', title: 'Link (Optional)', type: 'url'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Gallery', media: ImagesIcon}
    },
  },
})