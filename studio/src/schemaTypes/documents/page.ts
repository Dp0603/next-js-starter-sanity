import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      // 👇 I ADDED THE HERO TYPE HERE
      of: [
        {type: 'hero'},
        {type: 'stats'},
        {type: 'philosophy'},
        {type: 'productLookbook'},
        {type: 'services'},
        {type: 'ctaSection'},
        {type: 'callToAction'},
        {type: 'infoSection'},
        {type: 'aboutHero'},
        {type: 'locationSection'},
        {type: 'gallerySection'},
        {type: 'workflowSection'},
        {type: 'infrastructureSection'},
        {type: 'productShowcase'},
        {type: 'qualityStandards'},
        {type: 'qualityEthics'},
        {type: 'contactSection'},
        {type: 'brandShowcase'},
        {type: 'richTextSection'},
      ],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/studio/array-type#efb1fe03459d
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
