/**
 * Created by vadimsky on 01/07/16.
 */
const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const del = require('del');
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
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
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
        filename: 'index.js'
    },
    node: {
        __dirname: false,
        __filename: true
    },
    recordsPath: path.join(__dirname, 'build/_records')
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


gulp.task('clean', function(){
    return del('build')
});

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
    return gulp.src(['./src/**/*.spec.js'])
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});


gulp.task('tests', ['mocha']);
gulp.task('clean:build', ['clean']);
gulp.task('build', [/*'frontend-build',*/ 'clean', 'backend-build', 'mocha']);
gulp.task('watch', [/*'frontend-watch',*/ 'backend-watch']);

gulp.task('run', ['backend-watch', /*'frontend-watch'*/], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'build/index'),
        ignore: ['*'],
        watch: ['src/'],
        ext: 'noop'
    }).on('restart', function() {
        console.log('Patched!');
    });
});