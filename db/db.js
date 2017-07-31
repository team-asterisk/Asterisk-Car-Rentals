/* eslint-disable no-console */

const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            // eslint-disable-next-line max-len
            console.log(`Car Rentals databases connected at ${connectionString}`);
            return db;
        });
};

module.exports = { init };
