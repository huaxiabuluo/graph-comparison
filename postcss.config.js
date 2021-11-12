module.exports = {
  parser: false,
  exec: true,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: ['> 1% in CN', 'last 2 versions', 'ios >= 9', 'Android >= 4.4'],
    },
    cssnano: {},
  },
};
