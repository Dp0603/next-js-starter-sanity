import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Groups help organize the long list of fields in the Studio
  groups: [
    {name: 'brand', title: 'Branding'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'contact', title: 'Contact & Legal'},
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'object',
      group: 'brand',
      description: 'Manage how your logo appears in the header and footer.',
      fields: [
        {
          name: 'useCustomUrl',
          title: 'Use External URL instead of Upload?',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'logoImage',
          title: 'Desktop Logo (Full)',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.useCustomUrl === true,
        },
        {
          name: 'logoUrl',
          title: 'External Desktop Logo URL',
          type: 'url',
          hidden: ({parent}) => parent?.useCustomUrl !== true,
        },
        {
          name: 'logoMobileImage',
          title: 'Mobile/Footer Logo (Icon Only)',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.useCustomUrl === true,
        },
        {
          name: 'logoMobileUrl',
          title: 'External Mobile Logo URL',
          type: 'url',
          hidden: ({parent}) => parent?.useCustomUrl !== true,
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Akaame Exports Logo',
        },
      ],
    }),

    defineField({
      name: 'headerMenu',
      title: 'Header Navigation',
      group: 'navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'link', title: 'Link (Slug)', type: 'string'},
          ],
        },
      ],
    }),

    defineField({
      name: 'footerDescription',
      title: 'Footer Bio',
      type: 'text',
      group: 'brand',
      rows: 3,
    }),

    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'locations',
      title: 'Office Locations',
      group: 'contact',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'city', type: 'string'},
            {name: 'address', type: 'text', rows: 3},
          ],
        },
      ],
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      group: 'contact',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              description: 'e.g. LinkedIn, Instagram, Facebook',
            },
            {name: 'url', title: 'Profile URL', type: 'url'},
          ],
        },
      ],
    }),

    // Optimized for the "Download" button in the footer
    defineField({
      name: 'companyProfile',
      title: 'Company Profile PDF',
      group: 'brand',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      group: 'contact',
      type: 'string',
      initialValue: 'Akaame Exports Pvt. Ltd. All rights reserved.',
    }),

    defineField({
      name: 'legalLinks',
      title: 'Bottom Legal Links',
      group: 'navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'url', type: 'string'},
          ],
        },
      ],
    }),

    defineField({
      name: 'certificationsText',
      title: 'Certifications Text',
      group: 'contact',
      type: 'string',
    }),
  ],
})
