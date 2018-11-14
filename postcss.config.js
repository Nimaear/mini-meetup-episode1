module.exports = ({ webpack }) => {
  const pluginsFile = require.resolve('./postcss.plugins.js');
  const themeFile = require.resolve('./src/styles/theme.js');
  webpack.addDependency(themeFile);
  webpack.addDependency(pluginsFile);
  delete require.cache[themeFile];
  delete require.cache[pluginsFile];

  return {
    plugins: require(pluginsFile)(),
    sourceMap: true,
  };
};
