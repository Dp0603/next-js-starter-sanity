import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section (Bottom)',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string',
        initialValue: 'READY TO START?',
        validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'PARTNER WITH US.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    // Primary Button
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Initiate Dialogue'
    }),
    defineField({
        name: 'primaryButtonLink',
        title: 'Primary Button Link',
        type: 'string',
        initialValue: '/contact'
    }),
    // Secondary Button
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Email Us Directly'
    }),
    defineField({
        name: 'secondaryButtonLink',
        title: 'Secondary Button Link',
        type: 'string',
        initialValue: 'mailto:exports@akaame.com'
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'CTA Section', subtitle: 'Bottom Call to Action', media: BulbOutlineIcon}
    },
  },
})