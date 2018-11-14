const path = require('path');
const { resolve, rules, plugins } = require('./config');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  mode: 'production',
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/static/',
  },
  stats: 'verbose',
  module: {
    rules: rules.client.prod,
  },
  resolve,
  plugins: plugins.client.prod,
};
