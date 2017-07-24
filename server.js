/* eslint-disable no-console */

const config = require('./config');

(async () => {
    try {
        const db = await (require('./db').init(config.connectionString));
        const data = await require('./data').init(db);
        const app = await require('./app').init(data);

        app.listen(config.port, () =>
            console.log(`Car Rentals is now live at http://localhost:${config.port}`));
    } catch (err) {
        console.log(err.message);
    }
})();
