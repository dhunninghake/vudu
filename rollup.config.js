import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/vudu.js',
  format: 'cjs',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false
    }),
    commonjs({
      include: 'node_modules/**'
    }),
  ],
  dest: 'dist/vudu.js'
};
