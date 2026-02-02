import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'object',
      description: 'Manage how your logo appears in the header.',
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
          title: 'Mobile Logo (Icon Only)',
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
    defineField({name: 'footerDescription', title: 'Footer Bio', type: 'text'}),
    defineField({name: 'contactEmail', title: 'Contact Email', type: 'string'}),
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'city', type: 'string'},
            {name: 'address', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', type: 'string'},
            {name: 'url', type: 'url'},
          ],
        },
      ],
    }),
    defineField({name: 'companyProfile', title: 'Company Profile PDF', type: 'file'}),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'Akaame Exports Pvt. Ltd. All rights reserved.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Bottom Legal Links',
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
    defineField({name: 'certificationsText', title: 'Certifications Text', type: 'string'}),
  ],
})
