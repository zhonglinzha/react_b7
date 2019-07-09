
const base = require('./webpack.base');

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(base,{
    mode: 'production',
    performance: { //打包性能提示
        hints: 'warning',
        maxAssetSize: 2500000, //单文件超过250k，命令行告警
        maxEntrypointSize: 2500000, //首次加载文件总和超过250k，命令行告警
    },
    
});