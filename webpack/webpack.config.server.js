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
    // Need historyApiFallback to be able to refresh on dynamic route
    historyApiFallback: {
        disableDotRule: true
    }, 
    disableHostCheck: true,
    stats: {
        // Pretty colors in console
        colors: true,
        errorDetails: true
    }
 });
 server.listen(3001, '0.0.0.0');


