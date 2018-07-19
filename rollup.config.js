import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import gzip from 'rollup-plugin-gzip';

export default {
  entry: 'src/vudu.js',
  format: 'cjs',
  plugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', '.json'],
      preferBuiltins: false,
    }),
    filesize({
      showGzippedSize: true,
    }),
    gzip(),
  ],
  dest: 'dist/vudu.js',
};
