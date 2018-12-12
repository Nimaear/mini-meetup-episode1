const postcssPresetEnv = require('postcss-preset-env');
const paths = require('./config/paths');
const breakpoints = require('./src/styles/BreakPoints');
const isDev = process.env.NODE_ENV === 'development';

const cssNano = require('cssnano')({
  preset: 'default',
});

module.exports = () => {
  return [
    require('postcss-css-reset')(),
    require('postcss-import')({
      path: paths.srcStyle,
    }),
    require('postcss-each')(),
    require('postcss-nested')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      browsers: ['last 3 versions', 'IE >= 9', 'Edge <= 15'],
    }),
    require('postcss-simple-vars')({
      variables: () => require('./src/styles/theme.js')(),
    }),
    require('postcss-easy-media-query')({
      breakpoints,
    }),
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'warn',
        },
      },
    }),
    isDev ? null : cssNano,
  ];
};
