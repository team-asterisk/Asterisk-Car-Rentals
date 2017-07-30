/* eslint-disable no-console */
const async = () => {
    return Promise.resolve();
};

const run = (config) =>
    async()
        .then(() => require('./../db').init(config.connectionString))
        .then((db) => require('./../data').init(db))
        .then((data) => require('./../app').init(data))
        .then((app) => {
            //neded for WebSockets
            const httpServer = app.listen(config.port, () =>
                console.log(`Car Rentals is now live at http://localhost:${config.port}`));
        })
        .catch((err) => {
            console.log(err);
        });


// const {MongoClient} = require()

// const stop = (config) => {
//     async()

// };


module.exports = { run };
