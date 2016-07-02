/**
 * Created by vadimsky on 01/07/16.
 */
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const sourcemaps = require("gulp-sourcemaps");

const DeepMerge = require('deep-merge');
const nodemon = require('nodemon');
const WebpackDevServer = require('webpack-dev-server');
const mocha = require('gulp-mocha');
var babel = require('babel-core/register');

var deepmerge = DeepMerge(function(target, source, key) {
    if(target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

// generic
var defaultConfig = {
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['gulpBabel'] },
        ]
    }
};

if(process.env.NODE_ENV !== 'production') {
    //defaultConfig.devtool = '#eval-source-map';
    defaultConfig.devtool = 'source-map';
    defaultConfig.debug = true;
}

function config(overrides) {
    return deepmerge(defaultConfig, overrides || {});
}

// // frontend
// var frontendConfig = config({
//     entry: [
//         'webpack-dev-server/client?http://localhost:3000',
//         'webpack/hot/only-dev-server',
//         './static/js/main.js'
//     ],
//     output: {
//         path: path.join(__dirname, 'static/build'),
//         publicPath: 'http://localhost:3000/build',
//         filename: 'frontend.js'
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin({ quiet: true })
//     ]
// });

// backend

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    });

var backendConfig = config({
    entry: [
        './src/index.js'
    ],
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    // externals: [
    //     function(context, request, callback) {
    //         var pathStart = request.split('/')[0];
    //         if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
    //             return callback(null, "commonjs " + request);
    //         }
    //         callback();
    //     }
    // ],
    recordsPath: path.join(__dirname, 'build/_records')
    // plugins: [
    //     new webpack.IgnorePlugin(/\.(css|less)$/),
    //     new webpack.BannerPlugin('require("source-map-support").install();',
    //         { raw: true, entryOnly: false }),
    //     new webpack.HotModuleReplacementPlugin({ quiet: true })
    // ]
});

// tasks

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}

// gulp.task('frontend-build', function(done) {
//     webpack(frontendConfig).run(onBuild(done));
// });
//
// gulp.task('frontend-watch', function() {
//     //webpack(frontendConfig).watch(100, onBuild());
//
//     new WebpackDevServer(webpack(frontendConfig), {
//         publicPath: frontendConfig.output.publicPath,
//         hot: true
//     }).listen(3000, 'localhost', function (err, result) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log('webpack dev server listening at localhost:3000');
//         }
//     });
//
// });

gulp.task('backend-build', function(done) {
    webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function(done) {
    var firedDone = false;
    webpack(backendConfig).watch(100, function(err, stats) {
        if(!firedDone) {
            firedDone = true;
            done();
        }

        nodemon.restart();
    });
});

gulp.task('mocha', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});


gulp.task('tests', ['mocha']);
gulp.task('build', [/*'frontend-build',*/ 'backend-build', 'mocha']);
gulp.task('watch', [/*'frontend-watch',*/ 'backend-watch']);

gulp.task('run', ['backend-watch', /*'frontend-watch'*/], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'build/server'),
        ignore: ['*'],
        watch: ['src/'],
        ext: 'noop'
    }).on('restart', function() {
        console.log('Patched!');
    });
});