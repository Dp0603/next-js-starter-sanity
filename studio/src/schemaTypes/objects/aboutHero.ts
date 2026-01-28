import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const aboutHero = defineType({
  name: 'aboutHero',
  title: 'About Hero (Split)',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
        name: 'layout',
        title: 'Image Position',
        type: 'string',
        options: {
            list: [
                { title: 'Left', value: 'left' },
                { title: 'Right', value: 'right' }
            ],
            layout: 'radio'
        },
        initialValue: 'left'
    }),
    defineField({
        name: 'subtitle', 
        title: 'Subtitle', 
        type: 'string', 
        initialValue: 'OUR STORY',
        validation: (Rule) => Rule.required()
    }),
    defineField({
        name: 'heading', 
        title: 'Heading', 
        type: 'string', 
        initialValue: 'CRAFTED IN INDIA.',
        validation: (Rule) => Rule.required()
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    
    // Quote Section
    defineField({name: 'quote', title: 'Quote Text', type: 'text', rows: 2}),
    defineField({name: 'quoteAuthor', title: 'Quote Author', type: 'string'}),

    // Image
    defineField({name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),

    // Optional Stat
    defineField({name: 'statNumber', title: 'Stat Number (e.g. 30+)', type: 'string'}),
    defineField({name: 'statLabel', title: 'Stat Label (e.g. Years of Excellence)', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
  },
})