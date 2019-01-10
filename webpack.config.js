const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/demo/src/app.js',
  output: {
    path: __dirname + '/demo/build',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
      },
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
};
