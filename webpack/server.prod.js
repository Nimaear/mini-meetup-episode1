const path = require('path');
const webpack = require('webpack');
const { resolve, rules } = require('./config');

const res = (p) => path.resolve(__dirname, p);

const entry = res('../server/render.js');
const output = res('../build/server');

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: [entry],
  output: {
    path: output,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: rules.server.prod,
  },
  resolve,
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
};
