import { defineConfig } from 'tsup';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { sassPlugin } = require('esbuild-sass-plugin');

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: ['src/index.ts'],
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  esbuildPlugins: [
    sassPlugin({
      type: 'css',
    }),
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

