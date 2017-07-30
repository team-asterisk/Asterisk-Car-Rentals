const request = require('supertest');
const expect = require('chai').expect;

describe('-- Comments tests --', () => {
    const connectionString = 'mongodb://localhost/car-rentals-db-tests';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
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
