import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const inputFile = 'src/index.ts';

const outputFile = 'dist/index.js';
const outputDts = 'dist/index.d.ts';


export default [
  {
    input: inputFile,
    plugins: [
      esbuild()
    ],
    external: [
      'fa-minify',
      'plugin-error',
      'through2'
    ],
    output: {
      globals: {
        'through2': 'through',
        'plugin-error': 'PluginError',
        'fa-minify': 'faMinify'
      },
      file: outputFile,
      name: 'gulp-fa-minify',
      format: 'umd',
      sourcemap: true,
    }
  },
  {
    input: inputFile,
    plugins: [
      dts()
    ],
    output: {
      file: outputDts,
      format: 'es',
    }
  }
];