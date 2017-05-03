const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

let externals = {
    react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'react'
    },
    'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'react-dom'
    },
    'prop-types': {
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'prop-types',
        root: 'prop-types'
    },
    classnames: {
        commonjs: 'classnames',
        commonjs2: 'classnames',
        amd: 'classnames',
        root: 'classnames'
    },
    rx: {
        commonjs: 'rx',
        commonjs2: 'rx',
        amd: 'rx',
        root: 'rx'
    },
    tanok: {
        commonjs: 'tanok',
        commonjs2: 'tanok',
        amd: 'tanok',
        root: 'tanok'
    },
};
let entry = ['./src/index.js'];
let publicPath = './';
let filename = 'bundle.min.js';
let stylLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader?modules,localIdentName=[hash:base64:6]',
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
        filename: 'index.min.css',
    }),
    new OptimizeCssAssetsPlugin(),
];
let devtool = false;

if (DEVELOPMENT) {
    externals = {};
    entry = [
        'webpack-dev-server/client?http://0.0.0.0:3000',
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
                localIdentName: '[name]__[local]',
                importLoaders: 1,
            },
        },
        'stylus-loader',
    ];
    plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
    ];
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
        library: 'biglCustomCreator',
        libraryTarget: 'umd'
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
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins,
};
