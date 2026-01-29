import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title that appears in the browser tab (e.g., "Home | Akaame").',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by Google'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary for search engines (Google).',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated'),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image displayed when shared on LinkedIn, WhatsApp, etc.',
      options: {hotspot: true},
    }),
  ],
})
