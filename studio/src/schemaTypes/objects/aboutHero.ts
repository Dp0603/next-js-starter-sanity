import {defineField, defineType} from 'sanity'
import {BlockContentIcon, CheckmarkIcon, EditIcon} from '@sanity/icons'

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
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'OUR STORY',
      validation: (Rule) => Rule.required(),
    }),

    // 👇 UPGRADED: Rich Text with Size & Color controls
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}],
            annotations: [
              // 🎨 1. CUSTOM COLOR
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'object',
                icon: EditIcon,
                fields: [
                  defineField({
                    name: 'value',
                    title: 'Hex Code',
                    type: 'string',
                    description: 'e.g. #CD7D51',
                    initialValue: '#cd7d51',
                  }),
                ],
              },
              // 📏 2. CUSTOM SIZE
              {
                name: 'textSize',
                title: 'Font Size',
                type: 'object',
                icon: CheckmarkIcon,
                fields: [
                  defineField({
                    name: 'size',
                    title: 'Select Size',
                    type: 'string',
                    options: {
                      list: [
                        {
                          title: 'Massive (5rem)',
                          value: 'text-5xl md:text-7xl lg:text-[5rem] leading-[0.9]',
                        },
                        {
                          title: 'Large (4rem)',
                          value: 'text-4xl md:text-5xl lg:text-6xl leading-[1]',
                        },
                        {
                          title: 'Medium (3rem)',
                          value: 'text-3xl md:text-4xl lg:text-5xl leading-[1.1]',
                        },
                        {title: 'Small (2rem)', value: 'text-2xl md:text-3xl lg:text-3xl'},
                      ],
                    },
                    initialValue: 'text-4xl md:text-5xl lg:text-6xl leading-[1]',
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),

    // Quote Section
    defineField({name: 'quote', title: 'Quote Text', type: 'text', rows: 2}),
    defineField({name: 'quoteAuthor', title: 'Quote Author', type: 'string'}),

    // Image
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    // Optional Stat
    defineField({name: 'statNumber', title: 'Stat Number (e.g. 30+)', type: 'string'}),
    defineField({
      name: 'statLabel',
      title: 'Stat Label (e.g. Years of Excellence)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading.0.children.0.text',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'About Hero',
        media: media,
      }
    },
  },
})
