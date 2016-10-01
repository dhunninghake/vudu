const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/demo/src/app.js',
  output: {
    path: __dirname + '/demo/build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        loader: 'file-loader',
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/
      },
      { 
        loader: 'html!markdown',
        test: /\.md/ 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/demo/src/index.html',
      filename: 'index.html',
      inject: false
    })
  ]
};
