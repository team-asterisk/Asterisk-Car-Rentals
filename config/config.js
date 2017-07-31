const { gulpConfig } = require('./../gulpfile');

const port = gulpConfig.port.default;
const connectionString = gulpConfig.connectionString.deploy;
const sessionSecret = gulpConfig.sessionSecret.default;
const url = gulpConfig.url.local;
module.exports = { port, connectionString, sessionSecret, url };
