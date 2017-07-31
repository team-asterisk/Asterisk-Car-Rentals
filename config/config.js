const { gulpConfig } = require('./../gulpfile');

const port = gulpConfig.port.default;
const connectionString = gulpConfig.connectionString.default;
const sessionSecret = gulpConfig.sessionSecret.default;
const url = gulpConfig.url.local;
module.exports = { port, connectionString, sessionSecret, url };
