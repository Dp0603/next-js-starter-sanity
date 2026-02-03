import {defineField, defineType, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Text / Legal Section',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    // --- 1. NEW: Layout Control (Safe Addition) ---
    // Defaults to 'max-w-3xl' so old pages look exactly the same.
    defineField({
      name: 'containerWidth',
      title: 'Container Width',
      type: 'string',
      description: 'Choose "Wide" for Size Charts/Tables. Choose "Standard" for Blogs/Legal.',
      options: {
        list: [
          {title: 'Standard (Blog/Legal)', value: 'max-w-3xl'},
          {title: 'Wide (Tables/Charts)', value: 'max-w-6xl'},
          {title: 'Full Width', value: 'max-w-full'},
        ],
      },
      initialValue: 'max-w-3xl',
    }),

    // --- 2. EXISTING HEADER INFO (Unchanged) ---
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
      description: 'A short summary before the list starts.',
    }),

    // --- 3. EXISTING LEGAL ACCORDIONS (Strictly Preserved) ---
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
          ],
        },
      ],
    }),

    // --- 4. LEGACY CONTENT UPGRADE (Backward Compatible) ---
    // Old pages only had 'block' (text). New pages can use 'block', 'image', or 'table'.
    defineField({
      name: 'content',
      title: 'Main Content (Blog / Size Charts)',
      type: 'array',
      of: [
        // Standard Text (Existing)
        defineArrayMember({type: 'block'}),

        // Images (New Addition)
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
        }),

        // Tables (New Addition - Requires @sanity/table plugin)
        defineArrayMember({type: 'table'}),
      ],
      // Same hidden logic as before: Hide this if legalSections are being used
      hidden: ({parent}) => !!parent?.legalSections && parent.legalSections.length > 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      width: 'containerWidth',
    },
    prepare({title, width}) {
      return {
        title: title || 'Rich Text / Legal Section',
        subtitle: width === 'max-w-6xl' ? 'Wide Layout' : 'Standard Layout',
        media: BlockContentIcon,
      }
    },
  },
})
