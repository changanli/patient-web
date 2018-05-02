var path = require('path')
var webpack = require('webpack')
const config = require('../config')
/*
 console.log(__dirname)
 /Users/mac/Desktop/express-webpack-redux-backbone-master/build

 //拼接路径 `${__dirname}/../${dir}`
*/ 
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.dev.assetsPublicPath //解决图片无法显示的问题
    },
    module: {
        rules: [{
            test: /\.js$/, //用正则表达式的方式找到要处理的文件拓展名
            use: ['babel-loader'],
            include: [resolve('src')]
        }, {
            test: /\.(png|jpg|svg|gif)$/,
            use: 'url-loader?limit=8192&name=images/[name].[ext]' //如果图片大于8192将图片拷贝过去，如果小于则生成base64放在js里面
        }, {
            test: /\.ejs$/,
            use: {
                loader: 'ejs-loader'
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
          /*
            webpack在构建包的时候会按目录的进行文件的查找，resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀：
            然后我们想要加载一个js文件时，只要require('common')就可以加载common.js文件了。
        */
       //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.ejs', '.scss', '.js', '.json'],
        alias: {
             //模块别名定义，方便后续直接引用别名，无须多写长长的地址
            '@': resolve('src')
        }
    },
    plugins: [
        // 全局使用,无需每次都导入
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Backbone: 'backbone',
            weui: 'weui.js'
        })
    ]
}