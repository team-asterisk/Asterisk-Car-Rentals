const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../app/routers/api.router/controller');

describe('routers/api.router/controller', () => {
    let data = null;
    let controller = null;
    const users = [1, 2, 3];
    const cars = [4, 5, 6];
    const deals = [7, 8, 9];

    let req = null;
    let res = null;

    const options = {
        toastr: {
            success: () => 'success',
            error: () => 'error',
        },
        params: {
            id: '42',
            username: 'q',
            password: '123qwe',
        },
        body: {},
    };

    const user = {
        _id: '42',
        username: 'q',
        role: 'admin',
        bookings: [],
        passHash: '$2a$10$CPnMWUKVMyMTCqc0gJecKutlj9IAY6WgTVovpsmKXtz1Wo9vgE0TW',
    };

    const car = {
        _id: '42',
        makemodel: 'Lada',
    };

    beforeEach(() => {
        data = {
            users: {
                getAll: () => {
                    return Promise.resolve([user]);
                },
                findById: () => {
                    return Promise.resolve(user);
                },
                updateById: () => {
                    return Promise.resolve(user);
                },
                findByUsername: () => {
                    return Promise.resolve(user);
                },
            },
            cars: {
                getAll: () => {
                    return Promise.resolve([car]);
                },
                filterBy: () => {
                    return Promise.resolve([car]);
                },
                findById: () => {
                    return Promise.resolve(car);
                },
            },
        };

        const carHelperMock = {
            checkIfCarIsBooked: () => {
                return true;
            },
        };

        controller = init(data);
        controller.carHelper = carHelperMock;

        req = require('../../_mocks/req-res-doncho').getRequestMock(options);
        res = require('../../_mocks/req-res-doncho').getResponseMock();
    });


    it('expect getWelcomeMessage to send correct message', () => {
        return controller.getWelcomeMessage(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.be.equal('Welcome to the Asterisk - Car Rentals API!');
            });
    });

    it('expect getCarDetails to return car details', () => {
        return controller.getCarDetails(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.equal({ car });
            });
    });

    it('expect searchCars to return cars', () => {
        return controller.searchCars(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.filteredCars).to.deep.equal([car]);
            });
    });

    it('expect getDeals to return deals', () => {
        return controller.getDeals(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.deals).to.deep.equal([car]);
            });
    });

    it('expect getCars to return cars', () => {
        return controller.getCars(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.cars).to.deep.equal([car]);
            });
    });

    it('expect getCarCategory to return cars with matched category', () => {
        return controller.getCarCategory(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.cars).to.deep.equal([car]);
            });
    });

    it('expect viewAllBookings to return empty array when no bookings in user', () => {
        return controller.viewAllBookings(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.bookings).to.deep.equal([]);
            });
    });

    it('expect provideToken to provide token to user if auhorized', () => {
        return controller.provideToken(req, res, () => {})
            .then(() => {
                expect(res.body.message).to.be.equal('Enjoy your token!');
            });
    });

    describe('when user is not found', () => {
        beforeEach(() => {
            data = {
                users: {
                    getAll: () => {
                        return Promise.resolve(users);
                    },
                    findById: () => {
                        return Promise.resolve(user);
                    },
                    updateById: () => {
                        return Promise.reject('error');
                    },
                },
                cars: {
                    getAll: () => {
                        return Promise.resolve(cars);
                    },
                    filterBy: () => {
                        return Promise.resolve(deals);
                    },
                },
            };

            controller = init(data);
            req = require('../../_mocks/req-res-doncho').getRequestMock(options);
            res = require('../../_mocks/req-res-doncho').getResponseMock();
        });
    });
});
