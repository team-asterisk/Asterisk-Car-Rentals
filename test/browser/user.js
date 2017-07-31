/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const { setupDb } = require('./utils/setup-db');
const webdriver = require('selenium-webdriver');
const { appUrl, connectionString, port } = require('./config');

let server = null;
const { Server } = require('./../../server');

describe('Users - for registered visitors', () => {
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

    describe('Register page', () => {
        it('expect user to register successfully', (done) => {
            driver.get(appUrl + '/auth/register')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('name')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('user-phone')
                );
            })
            .then((el) => {
                return el.sendKeys('0899999999');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('user-email')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o@ab.bg');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('register-submit')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/login');
                done();
            });
        });
    });

    describe('Login page', () => {
        it('expect user to login successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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

    describe('Logout', () => {
        it('expect user to logout successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('logout')
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

    describe('Profile Page', () => {
        it('expect user to load profile page successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('profile')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/profile');
                done();
            });
        });
    });

    describe('Update Profile Page', () => {
        it('expect user to update profile successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('profile')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('repeat-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('name')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o2');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('profilesave')
                );
            })
            .then((el) => {
                return el.click();
            })
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
                    webdriver.By.id('profile')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('name')
                );
            })
            .then((el) => {
                return el.getAttribute('value');
            })
            .then((text) => {
                expect(text).to.contain('dan4o2');
                done();
            });
        });
    });

    describe('My Bookings Page', () => {
        it('expect user to load bookings page successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('mybookings')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/bookings');
                done();
            });
        });
    });

    describe('Leave Review Page', () => {
        it('expect user to load Leave Us Review page successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('leavereview')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/review');
                done();
            });
        });
    });

    describe('Leave Review Page', () => {
        it('expect user to leave review successfully', (done) => {
            driver.get(appUrl + '/auth/login')
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-username')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('login-password')
                );
            })
            .then((el) => {
                return el.sendKeys('dan4o');
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
                return driver.findElement(
                    webdriver.By.id('my-account-link')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('leavereview')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('review-text')
                );
            })
            .then((el) => {
                return el.sendKeys('Very good app - Steven give this guys 100%');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('reviewsend')
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

    describe('Load Book a Car page', () => {
        it('expect user to load book car page successfully', (done) => {
            driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('select_economy')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('button[class="view-deal-button"]')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('book-now')
                );
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain(appUrl + '/auth/bookings/add');
                done();
            });
        });
    });
});
