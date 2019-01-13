const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: __dirname + '/dev/src.js',
  output: {
    path: __dirname + '/dev',
    filename: 'dist.js',
  },
};
