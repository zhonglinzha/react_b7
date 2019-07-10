1环境篇

@babel/plugin-proposal-class-properties 用来解析类的属性的
@babel/plugin-proposal-decorators 给类添加注解
@babel/plugin-proposal-export-default-from 处理default问题

polyfill 三种方案
1、@babel/polyfill  全局polyfill 会污染全局和原生对象 应用中使用
2、@babel/plugin-transform-runtime(devDependency) 与 @babel/runtime(dependency)
plugin-transform-runtime 插件将所有编译时需要的helper方法统一从@babel/runtime中引入 ，不会污染全局和原生对象
弊端：不模拟实例方法 开发库、工具中使用
3、@babel/preset-env[useBuiltIns:"entry"] + @babel/polyfill 弊端：不模拟实例方法 开发库、工具中使用

插件顺序
Babel配置中的presets和plugins如果都将处理某段程序代码时，将按照以下顺序执行:
插件在 Presets 前运行。 插件顺序从前往后排列。Preset 顺序是从后往前。
由此可知，根据我们配置的presets可知，先执行@babel/preset-react，再执行@babel/preset-env。

2开发篇



html 页面适配rem
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1,user-scalable=no"/>
(window.__setFontSize__=function(){document.documentElement.style.fontSize = Math.min(640, Math.max(document.documentElement.clientWidth, 320)) / 320 * 14 + 'px'})()
window.addEventListener('resize', window.__setFontSize__);

html-webpack-plugin

css
css-loader
style-loader

sass-loader
node-sass

postcss-loader
autoprefixer
postcss.config.js 配置文件

mini-css-extract-plugin //抽离css
optimize-css-assets-webpack-plugin //压缩css

js

terser-webpack-plugin //js压缩
compression-webpack-plugin //gzip压缩
happypack//加速打包

img
url-loader
file-loader

asset 
add-asset-html-webpack-plugin
clean-webpack-plugin
copy-webpack-plugin

gzip压缩
compression-webpack-plugin


stylelint

stylelint
stylelint-order //css顺序
stylelint-config-recommended //官方标准 
stylelint-config-standard //官方标准
stylelint-webpack-plugin
5个够用
