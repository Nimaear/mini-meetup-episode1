const path = require('path');
const { resolve, rules, plugins } = require('./config');

const res = (p) => path.resolve(__dirname, p);

const entry = res('../server/render.js');
const output = res('../build/server');

module.exports = {
  name: 'server',
  devtool: 'source-map',
  target: 'node',
  mode: 'development',
  entry: ['regenerator-runtime/runtime.js', entry],
  output: {
    pathinfo: false,
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: rules.server.dev,
  },
  resolve,
  plugins: plugins.server.dev,
};
