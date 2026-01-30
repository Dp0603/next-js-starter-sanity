import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: EnvelopeIcon,
  fieldsets: [
    {name: 'header', title: 'Header Content', options: {collapsible: true, collapsed: false}},
    {name: 'details', title: 'Contact Information', options: {collapsible: true, collapsed: false}},
    {name: 'form', title: 'Form Settings', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // --- HEADER ---
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'header',
      initialValue: 'PARTNERSHIP',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'header',
      initialValue: 'INITIATE DIALOGUE.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'header',
      description: 'Brief inviting message displayed below the heading.',
    }),

    // --- CONTACT DETAILS ---
    defineField({
      name: 'addressHeading',
      title: 'Address Label',
      type: 'string',
      fieldset: 'details',
      initialValue: 'HEADQUARTERS',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
      fieldset: 'details',
    }),

    // 👇 NEW FIELD: Paste your Google Maps Embed Link here
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'text',
      rows: 3,
      fieldset: 'details',
      description:
        'Go to Google Maps -> Share -> Embed a map -> Copy ONLY the link inside src="..." and paste it here.',
      placeholder: 'https://www.google.com/maps/embed?...',
    }),

    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link (External)',
      type: 'url',
      description: 'Fallback link if the map fails, or for "Get Directions".',
      fieldset: 'details',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'mapImage',
      title: 'Map Preview Image',
      type: 'image',
      description: 'Upload a screenshot of the map location (recommended 600x300px).',
      fieldset: 'details',
      options: {hotspot: true},
    }),

    defineField({
      name: 'phoneHeading',
      title: 'Phone Label',
      type: 'string',
      fieldset: 'details',
      initialValue: 'DIRECT LINE',
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      description: 'Add numbers with country code (e.g. +91 9876543210).',
      fieldset: 'details',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^\+?[0-9\s]+$/, {name: 'phone', invert: false}).error(
              'Must be a valid phone number',
            ),
        },
      ],
    }),

    defineField({
      name: 'emailHeading',
      title: 'Email Label',
      type: 'string',
      fieldset: 'details',
      initialValue: 'EXPORT DIVISION',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      fieldset: 'details',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'hoursHeading',
      title: 'Business Hours Label',
      type: 'string',
      fieldset: 'details',
      initialValue: 'BUSINESS HOURS',
    }),
    defineField({
      name: 'hours',
      title: 'Hours Details',
      type: 'text',
      rows: 2,
      fieldset: 'details',
      placeholder: 'e.g. Mon - Sat: 9:00 AM - 7:00 PM IST',
    }),

    // --- FORM SETTINGS (Dynamic Dropdowns) ---
    defineField({
      name: 'productCategories',
      title: 'Form: Product Categories',
      description: 'The options shown in the "Product Category" dropdown.',
      fieldset: 'form',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['Footwear', 'Bags', 'Accessories', 'Private Label'],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Contact Section',
        subtitle: subtitle || 'Contact Form',
        media: EnvelopeIcon,
      }
    },
  },
})
