import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import path from 'path';

function inputFactory(input, name) {
  return {
    input: path.resolve(__dirname, `src/${input}.js`),
    output: {
      file: path.resolve(__dirname, `dist/${input}.js`),
      format: 'umd',
      name,
    },
    plugins: [resolve(), commonjs(), babel(), uglify(), filesize()],
  };
}

export default [inputFactory('vudu', 'vudu')];
