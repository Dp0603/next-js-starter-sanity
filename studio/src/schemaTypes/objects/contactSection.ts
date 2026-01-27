import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    // Header Info
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'PARTNERSHIP'}),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'INITIATE DIALOGUE.',
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),

    // Contact Details
    defineField({
      name: 'addressHeading',
      title: 'Address Label',
      type: 'string',
      initialValue: 'HEADQUARTERS',
    }),
    defineField({name: 'address', title: 'Address', type: 'text'}),

    defineField({
      name: 'phoneHeading',
      title: 'Phone Label',
      type: 'string',
      initialValue: 'DIRECT LINE',
    }),
    defineField({name: 'phones', title: 'Phone Numbers', type: 'array', of: [{type: 'string'}]}),

    defineField({
      name: 'emailHeading',
      title: 'Email Label',
      type: 'string',
      initialValue: 'EXPORT DIVISION',
    }),
    defineField({name: 'email', title: 'Email Address', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
