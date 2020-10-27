const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const rules = require('./webpack.rules');

rules.push({
    test: /\.scss$/,
    loaders: [
      "style-loader",
      "css-loader?url=false",
      "postcss-loader",
      "sass-loader"
    ]
});

module.exports = {
  module: {
    rules,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'assets', 'fonts'), to: path.resolve(__dirname, '.webpack', 'renderer', 'fonts') },
        { from: path.resolve(__dirname, 'src', 'assets', 'images'), to: path.resolve(__dirname, '.webpack', 'renderer', 'images') },
      ],
    }),
  ],
};
