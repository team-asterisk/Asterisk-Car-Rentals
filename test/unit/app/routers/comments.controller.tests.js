const { expect } = require('chai');
const { init } = require('../../../../app/routers/comments.router/controller');

describe('routers/comments.router/controller', () => {
    let data = null;
    let controller = null;
    const items = [1, 2, 3, 4];
    const carId = '123456789';

    let req = null;
    let res = null;

    const options = {
        body: 'text',
        user: 'gosho',
        params: {
            id: carId,
        },
        toastr: {
            success: () => 'success',
            error: () => 'error',
        },
    };

    beforeEach(() => {
        data = {
            cars: {
                createComment() {
                    return Promise.resolve(items);
                },
            },
        };

        controller = init(data);
        req = require('../../_mocks/req-res-doncho').getRequestMock(options);
        res = require('../../_mocks/req-res-doncho').getResponseMock();
    });

    it('expect addComment to return status code 200', () => {
        return controller.addComment(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.redirectUrl).to.be.equal('/car/' + carId);
            });
    });

    describe('when create returns error', () => {
        beforeEach(() => {
            data = {
                cars: {
                    createComment() {
                        return Promise.reject('error');
                    },
                },
            };

            controller = init(data);
            req = require('../../_mocks/req-res-doncho').getRequestMock(options);
            res = require('../../_mocks/req-res-doncho').getResponseMock();
        });

        it('expect addComment to return status code 400', () => {
            return controller.addComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.redirectUrl).to.be.equal('/car/' + carId);
                });
        });
    });
});
