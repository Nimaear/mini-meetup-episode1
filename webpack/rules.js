const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const createMinifier = require('css-loader-minify-class');

const isDev = process.env.NODE_ENV;

const cssLoader = { loader: 'css-loader' };
const cssHotLoader = { loader: 'css-hot-loader' };

const lessLoader = { loader: 'less-loader' };

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
};

const getLocalIdent = createMinifier({
  prefix: 'mme',
});

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};

const imageLoaderClient = {
  test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
  loader: 'file-loader',
  exclude: [/\.(config|overrides|variables)$/],
  options: {
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const imageLoaderServer = {
  ...imageLoaderClient,
  options: {
    ...imageLoaderClient.options,
    emitFile: false,
  },
};

const woffLoaderClient = {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    mimetype: 'application/font-woff',
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const woffLoaderServer = {
  ...woffLoaderClient,
  options: {
    ...woffLoaderClient.options,
    emitFile: false,
  },
};

const ttfLoaderClient = {
  test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader',
  // exclude: [/\.(config|overrides|variables)$/],
};

const ttfLoaderServer = {
  ...ttfLoaderClient,
  options: {
    emitFile: false,
  },
};

const otfLoaderClient = {
  test: /\.otf(\?.*)?$/,
  loader: 'file-loader',
  // exclude: [/\.(config|overrides|variables)$/],
  options: {
    mimetype: 'application/font-otf',
  },
};

const otfLoaderServer = {
  ...otfLoaderClient,
  options: {
    emitFile: false,
  },
};

const clientDev = [
  babelLoader,
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      cssHotLoader,
      ExtractCssChunks.loader,
      {
        loader: 'css-loader',
        options: {
          camelCase: true,
          modules: true,
          importLoaders: 1,
          // sourceMap: true,
          ident: 'css',
          localIdentName: '[name]_[local]-[hash:2]',
          minimize: !isDev,
          getLocalIdent: isDev ? undefined : getLocalIdent,
        },
      },
      postCssLoader,
    ],
  },
  {
    test: /\.less$/,
    use: [cssHotLoader, ExtractCssChunks.loader, cssLoader, lessLoader],
  },
  imageLoaderClient,
  woffLoaderClient,
  ttfLoaderClient,
  otfLoaderClient,
];

const serverDev = [
  babelLoader,
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          camelCase: true,
          modules: true,
          importLoaders: 1,
          sourceMap: true,
          ident: 'css',
          localIdentName: '[name]_[local]-[hash:2]',
          minimize: !isDev,
          getLocalIdent: isDev ? undefined : getLocalIdent,
        },
      },
      postCssLoader,
    ],
  },
  {
    test: /\.less$/,
    use: [cssLoader, lessLoader],
  },
  imageLoaderServer,
  woffLoaderServer,
  ttfLoaderServer,
  otfLoaderServer,
];

module.exports = {
  client: {
    dev: clientDev,
    prod: clientDev,
  },
  server: {
    dev: serverDev,
    prod: serverDev,
  },
};
