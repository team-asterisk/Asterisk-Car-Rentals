const request = require('supertest');
const expect = require('chai').expect;

describe('-- Other routes tests --', () => {
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

    describe('GET /', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/')
                .expect('Content-type', /html/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /MissingRoute', () => {
        it('should return 404', function(done) {
            request(app)
                .get('/random')
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
