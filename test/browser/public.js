/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const { appUrl, connectionString, port } = require('./config');

let server = null;
const { Server } = require('./../../server');


describe('Public - for unregistered visitors', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    before(() => {
        server = new Server();
        driver = setupDriver('chrome');

        server.run(
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
        server.stop('drop database');
        driver.quit();
    });

    describe('Home page', () => {
        it('expect title with text "Home"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.getTitle();
                })
                .then((title) => {
                    expect(title).to.contain('Home');
                    done();
                });
        });

        it('expect top container to exists', (done) => {
            driver.get(appUrl + '/auth/login')
                .then(() => {
                    return driver.findElements(
                        webdriver.By.id('top-container')
                    );
                })
                .then((el) => {
                    expect(el).to.exist;
                    done();
                });
        });
    });

    describe('Login page', () => {
        it('expect title with text "Login"', (done) => {
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

    describe('Register page', () => {
        it('expect title with text "Register"', (done) => {
            driver.get(appUrl + '/auth/register')
                .then(() => {
                    return driver.getTitle();
                })
                .then((title) => {
                    expect(title).to.contain('Register');
                    done();
                });
        });

        it('expect h1 with text "Register"', (done) => {
            driver.get(appUrl + '/auth/register')
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('h1')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Register');
                    done();
                });
        });
    });

    describe('Cars page', () => {
        it('expect title with text "All Cars"', (done) => {
            driver.get(appUrl + '/cars')
                .then(() => {
                    return driver.getTitle();
                })
                .then((title) => {
                    expect(title).to.contain('All Cars');
                    done();
                });
        });

        it('expect id car-rentals to exists', (done) => {
            driver.get(appUrl + '/cars')
                .then(() => {
                    return driver.findElements(
                        webdriver.By.id('car-rentals')
                    );
                })
                .then((el) => {
                    expect(el).to.exist;
                    done();
                });
        });
    });

    describe('Deals page', () => {
        it('expect title with text "Deals"', (done) => {
            driver.get(appUrl + '/deals')
                .then(() => {
                    return driver.getTitle();
                })
                .then((title) => {
                    expect(title).to.contain('Deals');
                    done();
                });
        });

        it('expect id car-rentals to exists', (done) => {
            driver.get(appUrl + '/deals')
                .then(() => {
                    return driver.findElements(
                        webdriver.By.id('car-rentals-deals')
                    );
                })
                .then((el) => {
                    expect(el).to.exist;
                    done();
                });
        });
    });
});
