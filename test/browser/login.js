/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const { appUrl, connectionString, port } = require('./config');

let server = null;
const { Server } = require('./../../server');

describe('Login routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    before(() => {
        server = new Server();

        return server.run(
            {
                connectionString: connectionString,
                port: port,
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

    afterEach(function() {
        driver.quit();
    });

    it('expect title with text "Car Rentals - Login"', (done) => {
        driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.contain('Login');
                done();
            });
    });

    it('expect h1 with text "Login"', (done) => {
        driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h1')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Login');
                done();
            });
    });
});
