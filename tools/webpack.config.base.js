const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getEnv } = require('./env');

const isDevEnv = () => getEnv() === 'development';
const useCssPlugin = () => getEnv() !== 'development';

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', path.resolve(__dirname, '../src/boot-loader.tsx')],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]~[chunkhash:5].chunk.js',
    path: path.resolve(__dirname, '..', './build'),
  },
  mode: isDevEnv() ? 'development' : 'production',
  stats: 'errors-warnings',
  resolve: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom',
      '~': path.resolve(__dirname, '..', './src/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /(?<!module)\.less$/,
        use: [
          useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
      {
        test: /\.module\.less$/,
        exclude: /node_modules/,
        use: [
          useCssPlugin() ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[local]__[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, '..', 'src'),
              },
            },
          },
          'postcss-loader',
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '..', 'build')],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html',
      chunks: ['common', 'app'],
      inject: false,
      prefix: (() => {
        if (isDevEnv()) {
          return 'http://127.0.0.1:8080/';
        }

        return '';

        // ["--def_publish_type=webapp","--def_publish_pages=[\"index.html\"]","--def_publish_env=daily"]
        // const buildArgs = process.env.BUILD_ARGV || '';
        // const envMatch = buildArgs.match(/def_publish_env=(\w+)/) || [];
        // const isDaily = envMatch[1] === 'daily';

        // const gitBranch = process.env.BUILD_GIT_BRANCH || '';
        // const versionMatch = gitBranch.match(/\d+(\.\d+){2}/g) || ['0.0.1'];

        // return `//${isDaily ? 'dev.' : ''}g.alicdn.com/bshop/h5-blockchain-2019/${versionMatch[0]}/`;
      })(),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // default: false,
        base: {
          name: 'base',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](react|react-dom|@hot-loader\/react-dom)[\\/]/,
          priority: -10,
        },
        commons: {
          minChunks: 2,
          name: 'commons',
          chunks: 'async',
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\/?(\w+\/?)*$/g, to: '/index.html' }],
    },
    allowedHosts: 'all',
    hot: true,
    // inline: true,
    host: '127.0.0.1',
    port: 8080,
    static: {
      staticOptions: {
        directory: path.resolve(__dirname, '../html'),
        publicPath: '/',
        // redirect: true,
        serveIndex: true,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://127.0.0.1/',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  },
};
