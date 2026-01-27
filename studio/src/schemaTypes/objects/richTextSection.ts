import {defineField, defineType} from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Text / Legal Section',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Legal Content',
      type: 'array',
      of: [{type: 'block'}], // Standard Rich Text Editor
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      // Show the first few words as a preview in the dashboard
      return {
        title: 'Text Section',
        subtitle: content?.[0]?.children?.[0]?.text || 'No content',
      }
    },
  },
})
