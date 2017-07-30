const { gulpConfig } = require('./../../../gulpfile');

const appUrl = gulpConfig.url.local + ':' + gulpConfig.port.browserTests;

module.exports = {
    appUrl,
    connectionString: gulpConfig.connectionString.browserTests,
    port: gulpConfig.port.browserTests
};