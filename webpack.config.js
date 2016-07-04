const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    },
    babel: {
        presets: ['es2015'],
        plugins: ['add-module-exports']
    },
    module: {
        loaders: [
            {test: /\.js$/,
                include: /lib/,
                exclude: /node_modules/, loaders: ['babel'] },
        ]
    },
    externals: nodeModules,
    devtool: 'sourcemap'
}


