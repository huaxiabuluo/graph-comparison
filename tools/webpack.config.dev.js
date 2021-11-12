const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { setEnv } = require('./env');
setEnv('daily');

const config = require('./webpack.config.base');
config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
