const port = 3001;
const connectionString = 'mongodb://localhost/car-rentals-db';
// const connectionString = 'mongodb://asterisk:hardtoguess@35.157.1.2:27017/test-cr-connection?authSource=admin';

const sessionSecret = 'Purple Unicorn';

module.exports = { port, connectionString, sessionSecret };
