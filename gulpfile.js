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
        browserTests: 3003
    },
    url: {
        local: 'http://localhost',
        amazon: 'http://35.158.166.9/'
    }
};

const { Server } = require('./server');
let server = null;

gulp.task('start-server:default', () => {
    server = new Server();
    return server.run(
        {
            connectionString: gulpConfig.connectionString.default,
            port: gulpConfig.port.default
        });

});

gulp.task('tests:functional', () => {
    server = new Server();

    return server.run(
        {
            connectionString: gulpConfig.connectionString.browserTests,
            port: gulpConfig.port.browserTests
        })
        .then(() => {
            gulp.src('./test/browser/**/*.js')
                .pipe(mocha({
                    reporter: 'nyan',
                    timeout: 10000
                }))
                .on('end', () => {
                    return server.stop({
                        config: {
                            connectionString: gulpConfig.connectionString.browserTests,
                            port: gulpConfig.port.browserTests
                        }
                    });
                });
        })
        .catch((err) => {
            console.log(err);
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

module.exports = {
    gulpConfig
};