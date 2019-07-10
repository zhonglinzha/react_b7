const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebPackPlugin = require('html-webpack-plugin');//模版配置
const HappyPack = require('happypack');//多线程打包，加快打包速度
const StyleLintPlugin = require('stylelint-webpack-plugin');//样式格式化

console.log('----->',process.env.NODE_ENV);
module.exports = {

    // entry: path.resolve('./src/base/index.js'), 这样是简写 默认输出的文件名是main
    entry: {
        index : path.resolve('./src/base/index.js'),// index 是输出的文件名
    },
    output: {
        path: path.resolve("./dist"),//输出路径
        filename: 'js/[name].[hash:8].js',//输出文件名
        publicPath: '',//cdn路径
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',//chunk文件的名字
    },
    resolveLoader: {
        modules: [path.resolve('./src/loaders'), 'node_modules'],//如果自定义了loader 用这个配置路径
    },
    resolve: {
        extensions: ['.js','.jsx','.json'],//资源文件一般带上后缀名，比如.scss .png 节约性能
        modules: ['node_modules'], //模块查找路径
        alias: {//路径别名 为了书写方便，同时便于维护
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
                loader: 'eslint-loader',
                include: path.resolve('./src'),
                exclude: /node_modules/,//这个里面不用检查，节约性能
                enforce: 'pre',//优先执行 语法检查
            },
            {   
                test: /\.jsx?$/,
                include: path.resolve('./src'),
                exclude: /node_modules/,
                use: 'happypack/loader?id=js',//用这个为了加速打包 配合下面的HappyPack一起使用 id=js 唯一标示
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
        // new BundleAnalyzerPlugin(), //打包分析
        new webpack.BannerPlugin('版权说明'), //添加说明
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
        new webpack.DllReferencePlugin({ //这个是引入dll库文件，为了加速打包，为了缓存
            manifest: path.resolve('./src/dll','manifest.json'),
        }),
        new HappyPack({ //加速打包 配合上面的 happypack/loader 一起使用
            id: 'js',//id 和上面的happypack/loader？id=js 匹配
            use:  ['babel-loader'],
        }),
        new StyleLintPlugin({//样式检查并修复问题
            files: 'src/**/*.scss',
            failOnError: false,
            syntax: 'scss',//指定语言
            fix: true,//自动修复
            cache: true,//缓存提高性能
        }),
    ]
}