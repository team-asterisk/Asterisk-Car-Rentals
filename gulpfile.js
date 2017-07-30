/*global process */

const nodemon = require('gulp-nodemon');

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const defaultConfig = require('./config');

const gulpConfig = {
    connectionString: {
        default: defaultConfig.connectionString,
        browserTests: 'mongodb://localhost/car-rentals-db-browser-tests'
    },
    port: {
        default: defaultConfig.port,
        browserTests: 3002
    }
};

const server = require('./server');

gulp.task('start-server:default', () => {
    server.run(
        {
            connectionString: gulpConfig.connectionString.default,
            port: gulpConfig.port.default
        });
});

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



gulp.task('dev', () => {
    return nodemon({
        ext: 'js pug html css',
        script: './launch.js',
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