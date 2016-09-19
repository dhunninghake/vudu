import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/vudu.js',
  format: 'cjs',
  plugins: [babel()],
  dest: 'dist/vudu.js'
};
