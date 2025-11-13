import { defineField, defineType } from 'sanity';

export const docPage = defineType({
  name: 'docPage',
  title: 'Documentation Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'Components', value: 'components' },
          { title: 'Templates', value: 'templates' },
          { title: 'API Reference', value: 'api' },
          { title: 'Deployment', value: 'deployment' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort documentation pages',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
        {
          type: 'code',
          options: {
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order',
    },
    prepare(selection) {
      const { category, order } = selection;
      return {
        ...selection,
        subtitle: `${category} - Order: ${order || 'N/A'}`,
      };
    },
  },
});
