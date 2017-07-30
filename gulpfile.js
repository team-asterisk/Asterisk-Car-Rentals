/*global process */

const nodemon = require('gulp-nodemon');

// const port = process.env.PORT || 3001;
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './utils/**/*.js',        
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('server', () => {
    require('./server');
});

gulp.task('dev', () => {
    return nodemon({
        ext: 'js pug html css',
        script: './server.js',
    });
});

gulp.task('tests:integration', ['pre-test'], () => {
    return gulp.src([
        './test/integration/**/*.js'
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/integration-tests'
        }));
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js'
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/unit-tests'
        }));
});