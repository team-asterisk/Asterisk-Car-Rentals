const { expect } = require('chai');
const { init } = require('../../../../app/routers/bookings.router/controller');

describe('routers/bookings.router/controller', () => {
    let data = null;
    let controller = null;
    const cars = [{
        category: 'Economy',
        booked: [{
            startdate: '2017-09-01',
            enddate: '2017-09-10',
        }],
    }];
    const carId = '123456789';

    let req = null;
    let res = null;

    const options = {
        body: 'text',
        user: 'gosho',
        params: {
            id: carId,
        },
        query: {
            pickup_date: '2017-10-01',
            dropoff_date: '2017-10-10',
            category: 'All',
        },
        toastr: {
            success: () => 'success',
            error: () => 'error',
        },
    };

    describe('when cars are found in db', () => {
        beforeEach(() => {
            data = {
                cars: {
                    findById() {
                        return Promise.resolve(cars[0]);
                    },
                    getAll() {
                        return Promise.resolve(cars);
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
    });

    describe('when cars are not found in db', () => {
        beforeEach(() => {
            data = {
                cars: {
                    findById() {
                        return Promise.reject('error');
                    },
                    getAll() {
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
    });
});
