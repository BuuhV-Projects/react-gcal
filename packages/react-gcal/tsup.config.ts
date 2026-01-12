import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

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
      cssImports: true,
    }),
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

