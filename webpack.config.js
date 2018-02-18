var webpack = require('webpack');
var path = require('path');
var uglify = require('uglifyjs-webpack-plugin');
var htmlWebpackPlugin = require("html-webpack-plugin");
var cleanWebpackPlugin = require("clean-Webpack-Plugin");
module.exports={
    entry:{
       "index": "./js/bar.js"
    },
    output:{
        path:"/myhtml/AIdome/dist",//绝对路径需要以当前盘为基础
        filename:"[name]-[chunkhash].js",
        publicPath:"./"//引用时的相对路径
    },
    module: {
        loaders: [
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },//修改html中img的src为相对路径
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },//定义css的loader
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
                options:{
                    publicPath:'/'//图片打包后的位置
                }
            }//定义img格式以及loader
        ]
    },
    plugins:[
        new uglify(),
        new cleanWebpackPlugin(["dist"]),//删除多余js
        new htmlWebpackPlugin({
            filename:'index.html',//指定生成的html的名称、路径相对于path
            template:"./html/index.html",//html模板 路径相对于工程文件夹
            inject:"body",//引用打包后js的位置在body中
            minify:{
                removeComments:true,//删除html中的空格
                collapseWhitespace:true//删除html中的注释
            },
            chunks:['index']//置顶当前html需要引用的js 是哪一个传入的值为数组
        })
    ]
};