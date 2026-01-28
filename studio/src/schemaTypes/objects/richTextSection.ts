import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Text / Legal Section',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    // Header Info
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      placeholder: 'e.g. TERMS OF SERVICE',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      placeholder: 'e.g. January 1, 2026',
    }),
    defineField({
      name: 'introduction',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,
      description: 'A short summary before the list starts.'
    }),

    // 👇 THE NEW STRUCTURE: Array of Foldable Sections
    defineField({
      name: 'legalSections',
      title: 'Interactive Sections (Accordion)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'heading', type: 'string', title: 'Section Heading'}),
            defineField({name: 'content', type: 'array', of: [{type: 'block'}], title: 'Content'}),
          ]
        }
      ]
    }),

    // Keep legacy field just in case
    defineField({
      name: 'content',
      title: 'Legacy Content (Standard Text)',
      type: 'array',
      of: [{type: 'block'}], 
      hidden: ({parent}) => !!parent?.legalSections // Hide if using new sections
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Legal Section',
        media: BlockContentIcon
      }
    },
  },
})