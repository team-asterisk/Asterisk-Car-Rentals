/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const { appUrl, connectionString, port } = require('./config');

let server = null;
const { Server } = require('./../../server');


describe('Home routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    before(() => {
        server = new Server();

        return server.run(
            {
                connectionString: connectionString,
                port: port
            })
            .then(() => {
                Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    after(() => {
        return server.stop('drop database');
    });

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('expect title with text "Car Rentals - Home"', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.contain('Car Rentals');
                done();
            });
    });
});
