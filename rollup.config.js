import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/vudu.js',
  format: 'cjs',
  plugins: [
    babel({
      externalHelpers: true,
      runtimeHelpers: true
    })
  ],
  dest: 'dist/vudu.js'
};
