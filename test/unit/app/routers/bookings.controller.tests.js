const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { init } = require('../../../../app/routers/bookings.router/controller');

describe('routers/bookings.router/controller', () => {
    let data = null;
    let controller = null;
    let carId = '';
    let cars = [];
    let req = null;
    let res = null;
    let user = {};
    let options = {};

    describe('when cars are found in db', () => {
        beforeEach(() => {
            carId = '123456789';
            cars = [{
                _id: carId,
                category: 'Economy',
                baseprice: 50,
                specialprice: 30,
                specialpriceactivated: 1,
                booked: [{
                    startdate: '2017-09-01',
                    enddate: '2017-09-10',
                }],
            }];

            user = {
                username: 'gosho',
                bookings: [{
                    _id: '1234',
                    car: {
                        makemodel: 'Ford',
                        _id: carId,
                    },
                }],
            };

            options = {
                body: {
                    startdate: '2017-10-01',
                    enddate: '2017-10-10',
                    _id: carId,
                },
                user: user,
                params: {
                    id: '1234',
                },
                query: {
                    pickup_date: '2017-11-01',
                    dropoff_date: '2017-11-10',
                    category: 'All',
                },
                toastr: {
                    success: () => 'success',
                    error: () => 'error',
                },
            };

            data = {
                cars: {
                    findById: () => {
                        return Promise.resolve(cars[0]);
                    },
                    getAll: () => {
                        return Promise.resolve(cars);
                    },
                    updateById: () => {
                        return Promise.resolve(cars[0]);
                    },
                    filterBy: () => {
                        return Promise.resolve(cars);
                    },
                },
                users: {
                    updateById: () => {
                        return Promise.resolve(user);
                    },
                },
            };

            controller = init(data);
            req = require('../../_mocks/req-res-doncho').getRequestMock(options);
            res = require('../../_mocks/req-res-doncho').getResponseMock();
        });

        it('expect addBookingMenu to render correct view', () => {
            return controller.getAddBookingMenu(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('auth/bookings/add');
                });
        });

        it('expect searchCars to render correct view', () => {
            return controller.searchCars(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('./public/search-cars');
                });
        });

        it('expect getEditBookingMenu to render correct view', () => {
            return controller.getEditBookingMenu(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('auth/bookings/edit');
                });
        });

        it('expect addBooking to redirect to correct route', () => {
            return controller.addBooking(req, res, 'ready')
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/bookings');
                });
        });

        it('expect addBooking to return correct status 200', () => {
            return controller.addBooking(req, res, 'ready')
                .then(() => {
                    expect(res.statusCode).to.equal(200);
                });
        });

        it('expect editBooking to redirect to correct route', () => {
            return controller.editBooking(req, res, 'ready')
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/bookings');
                });
        });

        it('expect edit to return correct status 200', () => {
            return controller.editBooking(req, res, 'ready')
                .then(() => {
                    expect(res.statusCode).to.equal(200);
                });
        });

        describe('expect _searchCarsByQuery() ', () => {
            const startDate = new Date('2018-10-01');
            const endDate = new Date('2018-10-10');
            const nowDate = new Date('2017-07-30');
            const category = 'Economy';

            it('to reject when a date is NaN', () => {
                return expect(controller._searchCarsByQuery(category, nowDate, 'pesho', endDate))
                    .to.be.rejectedWith('Please provide correct dates.');
            });

            it('to reject when now is bigger than start', () => {
                return expect(controller._searchCarsByQuery(category, new Date('2018-10-05'), startDate, endDate))
                    .to.be.rejectedWith('Please choose today or a future date.');
            });

            it('to reject when now is bigger than end', () => {
                return expect(controller._searchCarsByQuery(category, new Date('2018-12-15'), startDate, endDate))
                    .to.be.rejectedWith('Please choose a future date.');
            });

            it('to reject when start is bigger than end', () => {
                return expect(controller._searchCarsByQuery(category, nowDate, startDate, new Date('2018-08-01')))
                    .to.be.rejectedWith('Dropoff date must follow pickup date.');
            });

            it('to resolve with cars when all parameters match', () => {
                return expect(controller._searchCarsByQuery(category, nowDate, startDate, endDate)).to.be.eventually.be.fulfilled;
            });
        });
    });

    describe('when cars are not found in db', () => {
        beforeEach(() => {
            carId = '123456789';
            cars = [{
                _id: carId,
                category: 'Economy',
                baseprice: 50,
                specialprice: 30,
                specialpriceactivated: 1,
                booked: [{
                    startdate: '2017-09-01',
                    enddate: '2017-09-10',
                }],
            }];

            user = {
                username: 'gosho',
                bookings: [{
                    _id: '1234',
                    car: {
                        makemodel: 'Ford',
                        _id: carId,
                    },
                }],
            };

            options = {
                body: {
                    startdate: '2017-10-01',
                    enddate: '2017-10-10',
                    _id: carId,
                },
                user: user,
                params: {
                    id: '1234',
                },
                query: {
                    pickup_date: '2017-11-01',
                    dropoff_date: '2017-11-10',
                    category: 'All',
                },
                toastr: {
                    success: () => 'success',
                    error: () => 'error',
                },
            };

            data = {
                cars: {
                    findById: () => {
                        return Promise.reject('error');
                    },
                    getAll: () => {
                        return Promise.reject('error');
                    },
                    updateById: () => {
                        return Promise.reject('error');
                    },
                },
                users: {
                    updateById: () => {
                        return Promise.reject('error');
                    },
                },
            };

            controller = init(data);
            req = require('../../_mocks/req-res-doncho').getRequestMock(options);
            res = require('../../_mocks/req-res-doncho').getResponseMock();
        });

        it('expect searchCars to redirect to "/"', () => {
            return controller.searchCars(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/');
                });
        });

        it('expect searchCars to return status 401', () => {
            return controller.searchCars(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(401);
                });
        });

        it('expect addBooking to redirect to correct route when error occur', () => {
            return controller.addBooking(req, res, 'ready')
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/bookings/add/' + '1234');
                });
        });

        it('expect addBooking to return correct status code when error occur', () => {
            return controller.addBooking(req, res, 'ready')
                .then(() => {
                    expect(res.statusCode).to.equal(400);
                });
        });

        it('expect editBooking to redirect to correct route when error occur', () => {
            return controller.editBooking(req, res, 'ready')
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/bookings/' + '1234');
                });
        });

        it('expect editBooking to return correct status code when error occur', () => {
            return controller.editBooking(req, res, 'ready')
                .then(() => {
                    expect(res.statusCode).to.equal(400);
                });
        });
    });
});
