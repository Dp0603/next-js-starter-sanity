import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Customer Inquiries',
  type: 'document',
  icon: EnvelopeIcon,
  // Keep readOnly: true if you only want to view,
  // but removing it allows you to change the "Status" below.
  readOnly: false,
  fields: [
    // --- STATUS TRACKING (Highly Recommended) ---
    defineField({
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New Request', value: 'new'},
          {title: 'Contacted / Quoted', value: 'contacted'},
          {title: 'Order Confirmed', value: 'confirmed'},
          {title: 'Closed / Spam', value: 'closed'},
        ],
        layout: 'radio',
      },
    }),
    defineField({name: 'fullName', type: 'string', readOnly: true}),
    defineField({name: 'email', type: 'string', readOnly: true}),
    defineField({name: 'company', type: 'string', readOnly: true}),
    defineField({name: 'productCategory', type: 'string', readOnly: true}),
    defineField({name: 'targetMarket', type: 'string', readOnly: true}),
    defineField({name: 'quantity', type: 'string', readOnly: true}),
    defineField({name: 'timeline', type: 'string', readOnly: true}),
    defineField({name: 'priceRange', type: 'string', readOnly: true}),
    defineField({name: 'details', type: 'text', readOnly: true}),
    defineField({
      name: 'techPacks',
      title: 'Attachments',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
        },
        {type: 'file'},
      ],
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'fullName',
      company: 'company',
      status: 'status',
      date: 'submittedAt',
      media: 'techPacks.0',
    },
    prepare({title, company, status, date, media}) {
      // Logic for status emojis
      const statusMap: Record<string, string> = {
        new: '🔵',
        contacted: '🟡',
        confirmed: '🟢',
        closed: '⚪',
      }

      const formattedDate = date ? new Date(date).toLocaleDateString() : ''

      return {
        title: `${statusMap[status] || '⚪'} ${title || 'Anonymous'}`,
        subtitle: `${company || 'No Company'} | ${formattedDate}`,
        media: media || EnvelopeIcon,
      }
    },
  },
  // Order inquiries by newest first
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
})
