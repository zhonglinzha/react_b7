
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
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {loader: 'style-loader'},
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
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ],
                exclude: /src/,
            },
        ]
    },
});