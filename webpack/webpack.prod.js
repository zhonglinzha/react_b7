
const base = require('./webpack.base');

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清理文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//压缩css 和 mini-css-extract-plugin 一起使用
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');//添加文件到html
// const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip 压缩

module.exports = webpackMerge(base,{
    mode: 'production',
    performance: { //打包性能提示
        hints: 'warning',
        maxAssetSize: 2500000, //单文件超过250k，命令行告警
        maxEntrypointSize: 2500000, //首次加载文件总和超过250k，命令行告警
    },
    optimization: {
        // minimizer: [
        //     new OptimizeCSSAssetsPlugin()
        // ],
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,                    
                    {loader: 'css-loader', options: {
                        modules: {
                            localIdentName: '[local]_[hash:base64:8]',
                        }
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
        // new CompressionWebpackPlugin(),//gzip压缩配合nginx
        new CleanWebpackPlugin({}),//清除打包后的dist文件夹
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),//设置打包环境
        new MiniCssExtractPlugin({//抽离css
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].chunk.css',
        }),
        new AddAssetHtmlPlugin({//把dll文件添加到html中
            hash: true,
            filepath: path.resolve('./src/dll/*.js'),
            outputPath: path.resolve('/js'),
            publicPath: 'js/',
        }),
    ]
    
});