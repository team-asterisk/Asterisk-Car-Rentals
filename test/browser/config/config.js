const { gulpConfig } = require('./../../../gulpfile');

const appUrl = gulpConfig.url.local + ':' + gulpConfig.port.browserTests;

module.exports = {
    appUrl
};