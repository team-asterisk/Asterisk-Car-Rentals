/*global process */

const gulp = require('gulp');

const nodemon = require('gulp-nodemon');

// const port = process.env.PORT || 3001;

gulp.task('server', () => {
    require('./server');
});

gulp.task('dev', () => {
    return nodemon({
        ext: 'js pug html css',
        script: './server.js',
    });
});