const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

//
// module.exports = {
//     entry: [
//         __dirname + '/src/index.js'
//     ],
//     output: {
//         path: __dirname + '/dist',
//         filename: 'test.bundle.js'
//     },
//     target: 'server',
//     devtool: 'source-map',
//     module: {
//         loaders: [{
//             test: /\.js$/, exclude: /node_modules/,
//             loader: "babel-loader"
//         }]
//     }
// };

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
        filename: 'backend.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
        ]
    },
    externals: nodeModules,
    devtool: 'sourcemap'
}



// module.exports = {
//     entry: [
//         __dirname + '/src/index.js'
//     ],
//     output: {
//         path: __dirname + '/dist',
//         filename: 'test.bundle.js'
//     },
//     target: 'web',
//     devtool: 'source-map',
//     babel: {
//         presets: ['es2015', 'stage-0'],
//         plugins: ['add-module-exports']
//     },
//     module: {
//         loaders: [{
//             test: /test\/src\/.*\.js$/,
//             loader: 'babel'
//         }]
//     },
//     resolve: {
//         moduleDirectories: ['lib'],
//         extensions: ['', '.js']
//     }
// };
//
//
// module.exports = {
//     entry: './main.js',
//     output: { path: __dirname, filename: 'bundle.js' },
//     module: {
//         loaders: [
//             {
//                 test: /.jsx?$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 query: {
//                     presets: ['es2015', 'react']
//                 }
//             }
//         ]
//     },
// };
