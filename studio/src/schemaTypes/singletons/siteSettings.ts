import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // --- LOGO SECTION ---
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
          title: 'Logo Image (Upload)',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.useCustomUrl === true,
        },
        {
          name: 'logoUrl',
          title: 'External Logo URL',
          type: 'url',
          description: 'Paste a direct image link (e.g., https://site.com/logo.png)',
          hidden: ({parent}) => parent?.useCustomUrl !== true,
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
          initialValue: 'Akaame Exports Logo',
        },
      ],
    }),

    // --- HEADER SECTION ---
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

    // --- FOOTER SECTION ---
    defineField({
      name: 'footerDescription',
      title: 'Footer Bio',
      type: 'text',
      description: 'The short company description in the footer.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'city', title: 'City/Type', type: 'string'},
            {name: 'address', title: 'Full Address', type: 'text'},
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
            {name: 'platform', title: 'Platform Name', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'companyProfile',
      title: 'Company Profile PDF',
      type: 'file',
      description: 'Upload the PDF here for the footer download link.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description:
        'Text displayed after "© 2026". Example: Akaame Exports Pvt. Ltd. All rights reserved.',
      initialValue: 'Akaame Exports Pvt. Ltd. All rights reserved.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Bottom Legal Links',
      description: 'Links like Privacy Policy, Terms of Service, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'url', title: 'URL', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'certificationsText',
      title: 'Certifications Text',
      type: 'string',
      description: 'Text displayed at the bottom right (e.g. ISO 9001:2015 | SA8000 Certified)',
    }),
  ],
})
