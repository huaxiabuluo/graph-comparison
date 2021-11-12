const path = require('path');
const { setEnv } = require('./env');
setEnv('production');

const config = require('./webpack.config.base');

config.devtool = 'source-map';

module.exports = config;
