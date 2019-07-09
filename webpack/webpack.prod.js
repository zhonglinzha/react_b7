
const base = require('./webpack.base');

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css文件


module.exports = webpackMerge(base,{
    mode: 'production',
    performance: { //打包性能提示
        hints: 'warning',
        maxAssetSize: 2500000, //单文件超过250k，命令行告警
        maxEntrypointSize: 2500000, //首次加载文件总和超过250k，命令行告警
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,                    
                    {loader: 'css-loader', options: {
                        modules: true,
                    }},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ],
                include: /src/,
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,                    
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ],
                exclude: /src/,
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].chunk.css',
        }),
    ]
    
});