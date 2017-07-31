/* global process */

const nodemon = require('gulp-nodemon');

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const gulpConfig = {
    connectionString: {
        default: 'mongodb://localhost/car-rentals-db',
        browserTests: 'mongodb://localhost/car-rentals-db-browser-tests',
        deploy: 'mongodb://asterisk:hardtoguess@35.157.1.2:27017/test-cr-connection?authSource=admin',
    },
    port: {
        default: 3001,
        browserTests: 3003,
        deploy: 80,
    },
    sessionSecret: {
        default: 'Purple Unicorn',
    },
    url: {
        local: 'http://localhost',
        deploy: 'http://35.158.166.9/',
    },
};

const { Server } = require('./server');
let server = null;

gulp.task('deploy', () => {
    server = new Server();
    return server.run({
        connectionString: gulpConfig.connectionString.deploy,
        port: gulpConfig.port.deploy,
        sessionSecret: gulpConfig.sessionSecret.default,
        url: gulpConfig.url.deploy,
    });
});

gulp.task('start-server:local', () => {
    server = new Server();
    return server.run({
        connectionString: gulpConfig.connectionString.deploy,
        port: gulpConfig.port.default,
        sessionSecret: gulpConfig.sessionSecret.default,
        url: gulpConfig.url.local,
    });
});

gulp.task('start-server:develop', () => {
    server = new Server();
    return server.run({
        connectionString: gulpConfig.connectionString.default,
        port: gulpConfig.port.default,
        sessionSecret: gulpConfig.sessionSecret.default,
        url: gulpConfig.url.local,
    });
});

gulp.task('tests:functional', ['pre-functional-test'], () => {
    return gulp.src([
            './test/browser/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/functional-tests',
        }));
});


gulp.task('pre-test', () => {
    return gulp.src([
            './data/**/*.js',
            './app/**/*.js',
            './config/**/*.js',
            './db/**/*.js',
            './models/**/*.js',
            './utils/**/*.js',
            './server/**/*.js',
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('pre-functional-test', () => {
    return gulp.src([
        './app/routers/**/*.js'
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('nodemon', () => {
    return nodemon({
        ext: 'js pug html css',
        script: './launch.js',
    });
});

gulp.task('tests:integration', ['pre-test'], () => {
    return gulp.src([
            './test/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/integration-tests',
        }));
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './test/unit/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports({
            dir: './coverage/unit-tests',
        }));
});

module.exports = {
    gulpConfig,
};
