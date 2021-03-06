import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
      Assets: resolve('src/assets'),
      Components: resolve('src/components'),
      Hooks: resolve('src/hooks'),
      Utils: resolve('src/utils'),
      Pages: resolve('src/pages'),
      Type: resolve('src/types'),
    },
  },
  plugins: [vue(), vueJSX()],
});
