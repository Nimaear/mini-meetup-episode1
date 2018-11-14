const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const define = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    API_HOST: JSON.stringify(process.env.API_HOST || 'localhost:1337'),
  },
});
module.exports = {
  client: {
    dev: [
      new WriteFilePlugin(),
      new ExtractCssChunks(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ErrorOverlayPlugin(),
      define,
    ],
    prod: [
      new ExtractCssChunks(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      define,
      new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    ],
  },
  server: {
    dev: [
      new WriteFilePlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      define,
    ],
    prod: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      define,
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
};
