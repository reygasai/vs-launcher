const CopyPlugin = require('copy-webpack-plugin');
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
        { from: './src/assets/fonts', to: './assets/fonts' },
        { from: './src/assets/images', to: './assets/images' },
      ],
    }),
  ],
};
