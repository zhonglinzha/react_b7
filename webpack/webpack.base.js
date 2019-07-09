const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');//模版配置

module.exports = {

    // entry: path.resolve('./src/base/index.js'), 这样是简写 默认输出的文件名是main
    entry: {
        index : path.resolve('./src/base/index.js'),// index 是输出的文件名
    },
    output: {
        path: path.resolve("./dist"),//输出路径
        filename: 'js/[name].[hash:8].js',//输出文件名
        publicPath: '',//cdnl路径
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',//chunk文件的名字
    },
    resolveLoader: {
        modules: [path.resolve('./src/loaders'), 'node_modules'],//如果自定义了loader 用这个配置路径
    },
    resolve: {
        extensions: ['.js','.jsx','.json'],
        modules: ['node_modules'],
        alias: {
            '@base': path.resolve('./src/base'),
            '@dll': path.resolve('./src/dll'),
            '@page': path.resolve('./src/page'),
            '@store': path.resolve('./src/store'),
            '@img': path.resolve('./src/image'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve('./src'),
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'img/',
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            favicon: 'favicon.ico',
            inject: 'body',  // true默认值，script标签位于html文件的 body 底部 注入选项 
            title: 'testooo', // html 文件的标题
            template: path.resolve('./src/base/index.html'),
            filename: 'index.html',
            hash: true,//hash选项的作用是 给生成的 js 文件一个独特的 hash 值 xx.js?xxxxxx
            minify: {
                removeAttributeQuotes: false,//去除引号
                collapseWhitespace: false,//代码压缩
                removeComments: false,//去掉注释
                removeScriptTypeAttributes:true,//去掉type="text/javascript"
                removeStyleLinkTypeAttributes:true,//去掉type="text/css"
            },
        }),
    ]
}