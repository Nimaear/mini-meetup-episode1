const fs = require('fs');

const stylesDirs = ['./src/styles/'];

let done;

module.exports = ({ webpack }) => {
  const pluginsFile = require.resolve('./postcss.plugins.js');
  if (!done) {
    stylesDirs.forEach((stylesDir) => {
      fs.readdirSync(stylesDir).forEach((file) => {
        if (file.search('.js') > -1) {
          const dep = require.resolve(`${stylesDir}${file}`);
          webpack.addDependency(dep);
          delete require.cache[`${stylesDir}${file}`];
        }
      });
    });

    webpack.addDependency(pluginsFile);
    delete require.cache[pluginsFile];
    done = true;
  }

  return {
    plugins: require(pluginsFile)(),
    sourceMap: true,
  };
};
