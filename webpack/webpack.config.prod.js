let mkConfig=require('./webpack.composable.js');
// Because real config is placed in composable.js
// noinspection WebpackConfigHighlighting
module.exports=[
    mkConfig({
        publicHost:'http://ide.f6cf.pw:3001',
        browser:true,
        dev:true
    }),
    mkConfig({
        node:true,
        dev:true
    })
];