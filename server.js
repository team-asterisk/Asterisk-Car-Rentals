/* eslint-disable no-console */
/*global to*/

const async = () => {
    return Promise.resolve();
};

require('./utils/toAwait');


const config = require('./config');

(async () => {

    //TO example without try catch
    let db = await to(require('./db').init(config.connectionString));
    if (db.err) {
        console.log(db.err.message);
    } else {
        db = db.data;
    }

    try {

        const data = await require('./data').init(db);
        const app = await require('./app').init(data);

        app.listen(config.port, () =>
            console.log(`Car Rentals is now live at http://localhost:${config.port}`));
    }
    catch (err) {
        console.log(err.message);
    }
})();