/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const { appUrl } = require('./config');

describe('Login routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    beforeEach(() => {
        driver = setupDriver('chrome');
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
});
