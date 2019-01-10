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
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.md/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
};
