const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../app/routers/review.router/controller');

describe('routers/review.router/controller', () => {
    const reviews = null;
    let data = null;
    let controller = null;
    const items = [1, 2, 3, 4];
    const create = () => {
        return Promise.resolve(items);
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            reviews: {
                create() {
                    return Promise.resolve(items);
                },
            },
        };

        controller = init(data);
        const options = {
            toastr: {
                success: () => 'success',
                error: () => 'error',
            },
        };

        req = require('../../_mocks/req-res-doncho').getRequestMock(options);
        res = require('../../_mocks/req-res-doncho').getResponseMock();
    });


    it('expect getReviewForm to call res.render(auth/review)', () => {
        return controller.addReview(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.equal('/');
            });
    });

    it('expect addReview to redirect to "/" when successfull', () => {
        return controller.addReview(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.equal('/');
            });
    });

    describe('when create returns error', () => {
        beforeEach(() => {
            data = {
                reviews: {
                    create() {
                        return Promise.reject('error');
                    },
                },
            };

            controller = init(data);
            const options = {
                toastr: {
                    success: () => 'success',
                    error: () => 'error',
                },
            };

            req = require('../../_mocks/req-res-doncho').getRequestMock(options);
            res = require('../../_mocks/req-res-doncho').getResponseMock();
        });

        it('expect addReview to redirect to "/auth/review"', () => {
            return controller.addReview(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/review');
                });
        });
    });
});
