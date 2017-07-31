const request = require('supertest');
const expect = require('chai').expect;

const config = require('./config');
const { Server } = require('./../../server');

describe('-- Comments tests --', () => {
    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
            .then((obj) => {
                app = obj.app;
            });
    });

    describe('POST /car/comment:id', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/car/comment/424242424242')
                .expect('Content-type', /html/)
                .expect(403)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
