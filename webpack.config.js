/*
 * @Author: leftlevel
 * @Date: 2021-03-11 20:38:42
 * @LastEditors: leftlevel
 * @LastEditTime: 2021-03-11 21:52:32
 * @Description: 
 */
// 引入一个包
const path = require('path')
// 引入 html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入 clean 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack 中的所有配置信息都应该写在 module.exports
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件
        filename: "bundle.js",
        environment: {
            arrowFunction: false
        }
    },

    // 指定 webpack 打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                use: [
                    // 配置 babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置 babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        // 指定 corejs 版本
                                        "corejs": "3",
                                        // 使用 corejs 的方式
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },

            // 设置 less 文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置 webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}