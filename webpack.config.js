const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        test0: "./asset/js/index0.js",
        test1: "./asset/js/index1.js",
        test2: "./asset/js/index2.js",
        test: "./asset/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'asset/js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
    ]
}