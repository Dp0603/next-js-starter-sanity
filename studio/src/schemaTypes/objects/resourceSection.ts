import {defineField, defineType, defineArrayMember} from 'sanity'
import {FileText} from 'lucide-react'

export const resourceSection = defineType({
  name: 'resourceSection',
  title: 'Resource Download Section',
  type: 'object',
  icon: FileText,
  fields: [
    // --- SECTION CONTENT ---
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the heading (e.g. "Knowledge Center")',
      initialValue: 'Knowledge Center',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Resources & Downloads',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Access our company profiles, capability decks, and seasonal catalogs.',
    }),

    // --- FORM SETTINGS (Make this dynamic!) ---
    defineField({
      name: 'formTitle',
      title: 'Form Heading',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Unlock this Resource',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Helper Text',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Enter your details to download',
    }),
    defineField({
      name: 'formButtonText',
      title: 'Form Button Text',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Access Download',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Heading',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Access Granted',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      group: 'formSettings',
      initialValue: 'Your download is starting automatically.',
    }),

    // --- RESOURCES LIST ---
    defineField({
      name: 'resources',
      title: 'Downloads List',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'resourceItem',
          title: 'Resource',
          type: 'object',
          icon: FileText,
          fields: [
            defineField({
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'file',
              title: 'Upload File',
              type: 'file',
              options: {accept: '.pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx'},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'File Type Label',
              type: 'string',
              options: {
                list: [
                  {title: 'PDF Document', value: 'PDF'},
                  {title: 'Presentation (PPT)', value: 'PPT'},
                  {title: 'Spreadsheet (XLS)', value: 'XLS'},
                ],
              },
              initialValue: 'PDF',
            }),
            defineField({
              name: 'isGated',
              title: 'Gate this content?',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
  ],
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'formSettings', title: 'Form / Popup Settings'},
  ],
  preview: {
    select: {
      title: 'heading',
      resources: 'resources',
    },
    prepare({title, resources}) {
      return {
        title: title || 'Resource Section',
        subtitle: `${resources?.length || 0} downloads`,
      }
    },
  },
})
