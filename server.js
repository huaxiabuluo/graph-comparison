const webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');
// const internalIP = require('internal-ip');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./tools/webpack.config.base');

const compiler = webpack(config);
const portal = config.devServer.https ? 'https' : 'http';
const port = config.devServer.port;
const ip = config.devServer.host || '127.0.0.1';

// for (let key in config.entry) {
//   const arr = config.entry[key];
//   if (key !== 'common') {
//     arr.unshift('webpack-dev-server/client?' + portal + '://' + ip + ':' + port + '/', 'webpack/hot/dev-server');
//   }
// }

// config.plugins = config.plugins || [];
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(config.devServer, compiler).startCallback(() => {
  console.log(`Listening at localhost: ${port}`);
  console.log('Opening your system browser...');
  openBrowser(`${portal}://${ip}:${port}`);
});
