import type { Preview } from '@storybook/nextjs'

// Import Tailwind CSS v4 styles
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'hsl(220 20% 6%)' },
        { name: 'light', value: '#ffffff' },
        { name: 'card', value: 'hsl(220 15% 10%)' },
      ],
    },
  },
};

export default preview;