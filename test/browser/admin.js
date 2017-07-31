/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const { setupDb } = require('./utils/setup-db');
const webdriver = require('selenium-webdriver');
const { appUrl, connectionString, port } = require('./config');

let server = null;
const { Server } = require('./../../server');

describe('Admin - for admin only', () => {
    let driver = null;

    before(() => {
        setupDb();

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

    describe('Login page', () => {
        it('expect admin to login successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('admin');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('admin05');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-submit')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.contain('Home');
                done();
            });
        });
    });

    describe('Admin Dashboard Page', () => {
        it('expect admin to load Dashboard page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElements(
                    webdriver.By.id('dashboard')
                );
            })
            .then((el) => {
                expect(el).to.exist;
                done();
            });
        });
    });

    describe('Admin Dashboard Edit User Page', () => {
        it('expect admin to load Edit User Page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.edit-user-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/edituser');
                done();
            });
        });

        it('expect admin to update user profile successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.edit-user-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('saveuser')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/viewusers');
                done();
            });
        });
    });

    describe('Admin Dashboard - View Deals page', () => {
        it('expect admin to load View Deals page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('view-deals-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/viewdeals');
                done();
            });
        });
    });

    describe('Admin Dashboard - View Cars page', () => {
        it('expect admin to load View Cars page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('view-cars-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/viewcars');
                done();
            });
        });
    });

    describe('Admin Dashboard - View Bookings page', () => {
        it('expect admin to load View Bookings page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('view-bookings-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/viewbookings');
                done();
            });
        });
    });

    describe('Admin Dashboard - Add new car page', () => {
        it('expect admin to load Add new car page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('add-car-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/addcar');
                done();
            });
        });
    });

    describe('Admin Dashboard - Edit car page', () => {
        it('expect admin to edit car successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('dashboard-menu')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('view-cars-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.edit-car-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('updatecarbtn')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/viewcars');
                done();
            });
        });
    });
});
