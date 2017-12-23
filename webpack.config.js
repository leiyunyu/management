let webpack = require('webpack');
let path = require('path');
module.exports = {
    entry: {
        bundle: './main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(ttf|woff|eot|svg|png|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        port: 8888,
        historyApiFallback: true,
        inline:true,
        open: true,
        noInfo: true,
        hot: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool:'eval-source-map'
}