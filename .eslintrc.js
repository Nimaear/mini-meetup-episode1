const paths = require('./config/paths')

module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'wiremore',
    'wiremore/react',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['jsx-a11y', 'redux-saga', 'security', 'prettier', 'flowtype'],
  settings: {
    'import/resolver': {
      node: {
        paths: paths.resolveModules,
      },
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    indent: ['error', 2],
    'import/named': 0,
    'import/no-unassigned-import': 0,
    'import/no-named-as-default-member': 0,
    'prettier/prettier': 'error',
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
  },
  globals: {
    addTranslations: true,
    oxygenCss: true,
    shallow: true,
  },
}
