
const base = require('./webpack.base');

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HappyPack = require('happypack');//多线程打包，加快打包速度
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


module.exports = webpackMerge(base,{
    mode: 'development',
    devServer:{
        // contentBase:'./dist',
        contentBase:'./src/dll',
        port: 3002,
        compress: true,
        open: false,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: 'happypack/loader?id=scss',//用这个为了加速打包 配合下面的HappyPack一起使用 id=scss 唯一标示
                include: /src/,
            },
            {
                test: /\.s?css$/,
                use: 'happypack/loader?id=css',//用这个为了加速打包 配合下面的HappyPack一起使用 id=css 唯一标示
                exclude: /src/,
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
        new AddAssetHtmlPlugin({
            hash: true,
            filepath: path.resolve('./src/dll/*.js'),
            outputPath: path.resolve('/js'),
            publicPath: '',
        }),
        new HappyPack({ //加速打包 配合上面的 happypack/loader 一起使用
            id: 'scss',//id 和上面的happypack/loader？id=js 匹配
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader', options: {
                    modules: {
                        localIdentName: '[local]_[hash:base64:8]',
                    }
                }},
                {loader: 'postcss-loader'},
                {loader: 'sass-loader'},
                ],
        }),
        new HappyPack({ //加速打包 配合上面的 happypack/loader 一起使用
            id: 'css',//id 和上面的happypack/loader？id=js 匹配
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader'},
                {loader: 'sass-loader'},
            ],
        }),
    ]
});