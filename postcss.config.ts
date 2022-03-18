// Plugins
import tailwind from 'tailwindcss';
import preset from 'postcss-preset-env';
import tailwindNesting from 'tailwindcss/nesting';
// Config
import config from './tailwind.config';

export default {
  plugins: [
    tailwindNesting(),
    tailwind(config),
    preset({
      features: {
        'nesting-rules': false
      }
    }),
  ],
};
