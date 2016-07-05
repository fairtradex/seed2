const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
// fs.readdirSync('node_modules')
//     .filter(function(x) {
//         return ['.bin'].indexOf(x) === -1;
//     })
//     .forEach(function(mod) {
//         nodeModules[mod] = 'commonjs ' + mod;
//     });

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });


module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loaders: ['json-loader', 'babel-loader']
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test:  /\.json$/,
                loader: 'json-loader'
            },
        ]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        devFlagPlugin
    ],
    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        root: [
            path.resolve('./src'),
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'node_modules/winston/lib')
        ],
        modulesDirectories: [
            'node_modules',
            'node_modules/winston/lib/winston'
        ]
    },
    resolveLoader: {
        root: './node_modules'
    },
    node: {
        fs: "empty"
    },
    externals: {
        'fs': 'require("fs")',
        'buffer': 'require("buffer")',
        'winston': 'require("winston")',
        'system': '{}',
        'file': '{}'
    },
    devtool: 'sourcemap'
}


