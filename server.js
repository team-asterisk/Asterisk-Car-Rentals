/* eslint-disable no-console */

const config = require('./config');
const async = () => {
    return Promise.resolve();
};

async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Car Rentals is now live at http://localhost:${config.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
