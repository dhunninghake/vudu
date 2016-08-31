const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/demo/app.js',
  output: {
    path: __dirname + '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      },
      { 
        loader: 'html!markdown',
        test: /\.md/ 
      },
      { loader: 'json',
        test: /\.json$/ 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/demo/index.html',
      filename: 'index.html',
      inject: false
    })
  ]
};
