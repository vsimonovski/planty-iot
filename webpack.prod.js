const merge = require('webpack-merge');
const common = require('./webpack.common');

const MinifyPlugin = require('babel-minify-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        publicPath: './'
    },
    plugins: [new MinifyPlugin(), new cleanWebpackPlugin(['dist'])],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: '30',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    }
});
