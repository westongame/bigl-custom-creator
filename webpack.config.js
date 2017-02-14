const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

let externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
};
let entry = ['./src/index.js'];
let publicPath = './';
let filename = 'bundle.[hash:10].min.js';
let stylLoader = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
        'css-loader?localIdentName=[hash:base64:6]',
        'stylus-loader',
    ],
});
let plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION),
    }),
    new ExtractTextPlugin({
        filename: 'index.[contenthash:10].min.css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HTMLWebpackPlugin({
        template: 'index-template.html',
    }),
];
let devtool = false;

if (DEVELOPMENT) {
    externals = {};
    entry = [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/index.js',
    ];
    publicPath = '/dist/';
    filename = 'bundle.js';
    stylLoader = [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: true,
                localIdentName: '[local]',
                importLoaders: 1,
            },
        },
        'stylus-loader',
    ];
    plugins = [new webpack.HotModuleReplacementPlugin()];
    devtool = 'inline-source-map';
}

module.exports = {
    externals,
    devtool,
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath,
        filename,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                enforce: 'pre',
                use: [{ loader: 'eslint-loader', options: { rules: { semi: 0 } } }],
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.styl$/,
                loader: stylLoader,
                exclude: '/node_modules/',
            },
            {
                test: /\.svg$/,
                loaders: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        query: {
                            svgo: {
                                plugins: [{ removeTitle: false }],
                                floatPrecision: 2,
                            },
                        },
                    },
                ],
                exclude: '/node_modules/',
            },
        ],
    },
    plugins,
};
