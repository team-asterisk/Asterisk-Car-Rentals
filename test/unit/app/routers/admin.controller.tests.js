const { expect } = require('chai');
const { init } = require('../../../../app/routers/admin.router/controller');

describe('routers/admin.router/controller', () => {
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
        },
        body: {},
    };

    const user = {
        _id: '42',
        username: 'q',
        role: 'admin',
        bookings: [],
        passhash: 'hsah',
    };

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
                    return Promise.resolve(user);
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


    it('expect getViewBookings to render correct view', () => {
        return controller.getViewBookings(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('auth/admin/viewbookings');
                expect(res.context.context).to.be.equal(users);
            });
    });

    it('expect getViewCars to to render correct view', () => {
        return controller.getViewCars(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('auth/admin/viewcars');
                expect(res.context.context).to.be.equal(cars);
            });
    });

    it('expect getViewDeals to to render correct view', () => {
        return controller.getViewDeals(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('auth/admin/viewdeals');
                expect(res.context.context).to.be.equal(deals);
            });
    });

    it('expect getEditUserByIdForm to to render correct view', () => {
        return controller.getEditUserByIdForm(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('auth/admin/edituser');
                expect(res.context.user).to.equal(user);
            });
    });

    it('expect updateUserProfile to render correct view', () => {
        return controller.updateUserProfile(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.equal('/auth/viewusers');
                expect(res.statusCode).to.equal(200);
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

        it('expect updateUserProfile to return correct status code', () => {
            return controller.updateUserProfile(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/viewusers');
                    expect(res.statusCode).to.equal(400);
                });
        });
    });
});