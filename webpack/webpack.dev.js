
const base = require('./webpack.base');

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(base,{
    mode: 'development',
    devServer:{
        contentBase:'./dist',
        port: 3002,
        compress: true,
        open: false,
    },
});