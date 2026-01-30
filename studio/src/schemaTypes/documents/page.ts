import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,

  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'content',
    }),

    defineField({
      name: 'legalType',
      title: 'Legal Page Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Privacy Policy', value: 'privacy'},
          {title: 'Terms of Service', value: 'terms'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => {
        const slug = (document?.slug as any)?.current
        if (!slug) return true 
        return !['privacy', 'privacy-policy', 'terms', 'terms-of-service'].includes(slug)
      },
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      group: 'content',
      of: [
        // Home page
        {type: 'hero'},
        {type: 'stats'},
        {type: 'brandShowcase'},
        {type: 'philosophy'},
        {type: 'services'},
        {type: 'ctaSection'},
        {type: 'productLookbook'},
        
        {type: 'infoSection'},
        
        // About page
        {type: 'aboutHero'},
        {type: 'locationSection'},
        {type: 'gallerySection'},
        
        
        // Capabilities page
        {type: 'workflowSection'},
        {type: 'infrastructureSection'},
        
        
        // Products page
        {type: 'productShowcase'},
        {type: 'qualityStandards'},
        {type: 'qualityEthics'},
        {type: 'contactSection'},
        {type: 'richTextSection'},
        {type: 'callToAction'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
})
