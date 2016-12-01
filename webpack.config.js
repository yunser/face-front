var path = require('path');
module.exports = {
    entry: "./asset/js/index.js",
    output: {
        path: __dirname,
        filename: "all.js"
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
    }
}