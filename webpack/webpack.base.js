const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebPackPlugin = require('html-webpack-plugin');//模版配置
const HappyPack = require('happypack');//多线程打包，加快打包速度
const StyleLintPlugin = require('stylelint-webpack-plugin');//样式格式化

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
    optimization: { 
        runtimeChunk: {
            name: 'runtime'
        },
        // usedExports: true, // 这个是用来作树摇晃用的 "sideEffects": ["*.scss"]
        noEmitOnErrors: true,//出错了就停止编译
        splitChunks: {//优化项 其实这里一般都是默认配置就可以 只是把chunks: 'all' 改一下
          chunks: 'all', //默认async 只对异步代码作分割 改成all 同步异步都可以分割 这里分割同步代码会根据cacheGroups配置做处理
          minSize: 30000,//大于30kb才做代码分割
          //maxSize: 0,//可配可不配 一般对代码2次分割 一般不写
          minChunks: 1,//代码引用次数超过1就被分割 貌似这个是对同步代码而言
          maxAsyncRequests: 5,//默认配置 网络请求最大数 不太理解
          maxInitialRequests: 3,//默认配置 入口文件引入最大数 不太理解
          automaticNameDelimiter: '~', //
          name: true,// 默认配置 这个是让 cacheGroups 这里的filename生效 
          cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.(s|l)?css$/,
                chunks: 'all',
                enforce: true,
                priority: -1,//优先级 看是分到哪里去 这里或者下面
                reuseExistingChunk: true,
            },
            vendors: { //判断代码是不是在node_modules中，如果是就打包到vendors这个组中 这里第三方代码分割
                test: /[\\/]node_modules[\\/]/,
                priority: -10//优先级 看是分到哪里去 这里或者下面
            },
            default: { //如果代码不在node_modules中，就到这个组里 这里是业务代码分割
                // 这里没有写 test 项 说明所有代码都符合 需要使用 priority 优先级来作区分
                //minChunks: 2, //这个没说明 不太清楚
                priority: -20,
                reuseExistingChunk: true//代码复用 如果一个模块被打包过，就复用
            }
          }
        }
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