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

const { Server } = require('./server');
const server = new Server();

gulp.task('start-server:default', () => {
    return server.run(
        {
            connectionString: gulpConfig.connectionString.default,
            port: gulpConfig.port.default
        });

});

gulp.task('stop-server:default', () => {
    return server.stop({
        config: {
            port: gulpConfig.port.default
        }
    });
});


gulp.task('start-server:browser-tests', () => {
    return server.run(
        {
            connectionString: gulpConfig.connectionString.browserTests,
            port: gulpConfig.port.browserTests
        });

});

gulp.task('stop-server:browser-tests', () => {
    return server.stop({
        config: {
            connectionString: gulpConfig.connectionString.browserTests,
            port: gulpConfig.port.default
        }
    });
});


gulp.task('tests:functional', () => {

    return server.run(
        {
            connectionString: gulpConfig.connectionString.browserTests,
            port: gulpConfig.port.browserTests
        })
        .then(() => {
            console.log('--------------');
            console.log('FUNCTIONAL TESTS');
            console.log('--------------');
            
            
        })
        .then(() => {
            return server.stop({
                config: {
                    connectionString: gulpConfig.connectionString.browserTests,
                    port: gulpConfig.port.browserTests
                }
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