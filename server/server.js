/* eslint-disable no-console */
const async = () => {
    return Promise.resolve();
};

class Server {

    constructor() {
        this.servers = [];
    }

    run(config) {
        return async()
            .then(() => require('./../db').init(config.connectionString))
            .then((db) => require('./../data').init(db))
            .then((data) => require('./../app').init(data))
            .then((app) => {
                //neded for WebSockets
                const httpServer = app.listen(config.port, () =>
                    console.log(`Car Rentals is now live at http://localhost:${config.port}`));
                this.servers.push({
                    config,
                    httpServer
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    stop(options) {
        return async()
            .then(() => {
                const server = this.servers.find((s) =>
                    s.config.connectionString === options.config.connectionString &&
                    s.config.port === options.config.port).httpServer;
                if (!server) {
                    return Promise.reject('Server not iniated');
                }
                return Promise.resolve(server);
            })
            .then((server) => {
                return server.close(() => {
                    console.log(`Server at: ${options.config.port} now closed `);
                });
            })
            .then(() => {
                if (options.config.connectionString) {
                    const { MongoClient } = require('mongodb');
                    return MongoClient.connect(options.config.connectionString)
                        .then((db) => {
                            return db.dropDatabase();
                        })
                        .then(() => {
                            console.log(`Database: ${options.config.connectionString} sucessfully dropped`);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                }
                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


module.exports = { Server };
