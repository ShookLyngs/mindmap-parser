import { useBodies, useFixedContainers } from './src/modules/theme';
import { TailwindConfig } from 'tailwindcss/tailwind-config';

const config: TailwindConfig = {
  content: [
    './src/**/*.{vue,js,ts,tsx,html}',
  ],
  darkMode: 'media',
  theme: {},
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
      boxShadow: ['active', 'focus'],
      borderWidth: ['hover'],
      borderColor: ['active', 'focus'],
      opacity: ['active'],
    },
  },
  plugins: [
    useFixedContainers(),
    useBodies({
      space: {
        x: '1.25rem',
        y: '1.25rem',
      },
    }),
  ]
};

export default config;
