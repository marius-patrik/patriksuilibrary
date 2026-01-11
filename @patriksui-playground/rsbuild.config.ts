import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'PatrikSUI Playground',
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
});
