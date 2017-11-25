const gulp = require('gulp');
const connect = require('gulp-connect');
//const gulpWebpack = require('gulp-webpack');
const gulpUtil = require('gulp-util');
const gulpWebpack = require('webpack-stream');
const useref = require('gulp-useref');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const htmlmin = require('gulp-htmlmin');
const open = require('gulp-open');
const shell = require('gulp-shell');

const config = {
    serverRoot: 'build/',
    baseUrl: 'http://localhost',
    port: '8888',
    path: {
        html: 'src/**/*.html',
        distHtml: 'build/',
        jsx: 'src/**/*.jsx',
    }
}

gulp.task('connect', function(){
    connect.server({
        root: config.serverRoot,
        port: config.port,
        base: config.baseUrl,
        livereload: true,
        middleware: function (connect, opt) {
            return [history()];
        }
    });
});

gulp.task('open', function(){
    gulp.src('')
        .pipe(open({uri: config.baseUrl + ':' + config.port}));
});

gulp.task('copy-files', function () {
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('build/'));
});

gulp.task('html', function(){
    gulp.src(config.path.html)
        .pipe(htmlmin({removeComments: true,collapseWhitespace: true}))
        .pipe(gulp.dest(config.path.distHtml))
        .pipe(connect.reload());
});

gulp.task('jsx', function(){
    gulp.src('src/**/*.jsx')
        .pipe(gulpWebpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.jsx, ['jsx']);
});

gulp.task('attention-build-vendor', function () {
    //TODO: if vendor.js doesn't exsist, then show then log
    gulpUtil.log(gulpUtil.colors.bgRed('Attention!'),
        'If you run ',gulpUtil.colors.red('gulp'),' first time, ' +
        'you should run', gulpUtil.colors.red('gulp build-vendor'), 'before.');
});

gulp.task('build-vendor', function () {
    gulp.src('*.js', {read: false})
        .pipe(shell([
            'webpack --config webpack.dll.config.js'
        ]))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['connect', 'html', 'jsx', 'watch', 'open', 'attention-build-vendor']);