const path = require('path');
const { resolve, rules, plugins } = require('./config');

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
  plugins: plugins.server.prod,
};
