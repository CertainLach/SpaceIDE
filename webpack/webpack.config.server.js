const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

let mkConfig=require('./webpack.composable.js');

server = new WebpackDevServer(webpack(mkConfig({
    browser:true,
    dev:true,
    publicHost:'http://ide.f6cf.pw:3001'
})), {
    hot: true,
    inline: true,
    https: false,
    lazy: false,
    compress:true,
    contentBase: path.join(__dirname, '../../src/'),
    historyApiFallback: {
        disableDotRule: true
    }, // Need historyApiFallback to be able to refresh on dynamic route
    disableHostCheck: true,
    stats: {
        colors: true
    } // Pretty colors in console
 });server.listen(3001, '0.0.0.0');


