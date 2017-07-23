const port = 3001;
const connectionString = 'mongodb://localhost/car-rentals-db';
// const connectionString = 'mongodb://asterisk:javascript...@carrentalstest-shard-00-00-to2mi.mongodb.net:27017,carrentalstest-shard-00-01-to2mi.mongodb.net:27017,carrentalstest-shard-00-02-to2mi.mongodb.net:27017/car-rentals-db?ssl=true&replicaSet=CarRentalsTest-shard-0&authSource=admin';

const sessionSecret = 'Purple Unicorn';

module.exports = { port, connectionString, sessionSecret };