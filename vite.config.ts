// Vite
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
// PostCSS
import postcss from './postcss.config';
// Path
import { join } from 'path';
const resolve = (...paths) => join(__dirname, ...paths);

export default defineConfig({
  css: {
    postcss,
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: resolve('src') },
      { find: 'mindmap-parser', replacement: resolve('src/packages/mindmap-parser') },
    ],
  },
  plugins: [
    vue(),
    jsx(),
  ],
});
