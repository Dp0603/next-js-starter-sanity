import {defineField, defineType} from 'sanity'
import {CheckmarkIcon, EditIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    // 👇 UPGRADED: Rich Text with Inline Annotations
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          // Disable standard H1/H2 dropdowns since we are doing it word-by-word now
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}], // Keep Bold
            annotations: [
              // 🎨 1. CUSTOM COLOR ANNOTATION
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'object',
                icon: EditIcon, // Icon in the toolbar
                fields: [
                  defineField({
                    name: 'value',
                    title: 'Hex Code',
                    type: 'string',
                    description: 'e.g. #CD7D51 or #FFFFFF',
                    validation: (Rule) =>
                      Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                        name: 'hex',
                        invert: false,
                      }).error('Must be a valid Hex code like #FF0000'),
                    initialValue: '#cd7d51',
                  }),
                ],
              },
              // 📏 2. CUSTOM SIZE ANNOTATION
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
                          title: 'Massive (9rem)',
                          value:
                            'text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[9rem] leading-[0.9]',
                        },
                        {
                          title: 'Huge (7rem)',
                          value: 'text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9]',
                        },
                        {
                          title: 'Large (5rem)',
                          value: 'text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1]',
                        },
                        {
                          title: 'Medium (3rem)',
                          value: 'text-2xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.1]',
                        },
                        {
                          title: 'Small (2rem)',
                          value: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
                        },
                      ],
                    },
                    initialValue:
                      'text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[9rem] leading-[0.9]',
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    // Buttons
    defineField({
      name: 'buttonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Begin Partnership',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'View Products',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '/products',
    }),
  ],
  preview: {
    select: {
      title: 'heading.0.children.0.text',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Component',
        media,
      }
    },
  },
})
