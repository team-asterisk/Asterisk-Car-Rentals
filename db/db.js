/* eslint-disable no-console */

const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log(`Car Rentals databases connected at ${connectionString}`);
            return db;
        });
};

module.exports = { init };
