import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },

  bundle: true,
  format: ['cjs'],
  target: 'es2017',
  splitting: false,
  clean: true,
  dts: false,
  outDir: 'dist',

  external: [
    'react',
    'react-dom',
    'tslib', // 🔴 FUNDAMENTAL
  ],
  
  noExternal: [
    // força bundle de tudo EXCETO o que está em external
    /^(?!react$|react-dom$|tslib$).*/,
  ],

  treeshake: false,
  minify: false,

  esbuildOptions(options) {
    options.platform = 'node';
    options.mainFields = ['main'];
    options.conditions = [];
  },
});
