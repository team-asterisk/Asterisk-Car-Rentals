const request = require('supertest');
const expect = require('chai').expect;

describe('-- Bookings tests --', () => {
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

    describe('GET /searchcars', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/searchcars')
                .expect(302)
                .expect('Location', '/')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/bookings/add/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/bookings/add/424242424242')
                .expect(302)
                .expect('Location', '/auth/login')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /auth/bookings/add/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/auth/bookings/add/424242424242')
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

    describe('GET /auth/bookings/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/bookings/424242424242')
                .expect(302)
                .expect('Location', '/auth/login')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /auth/bookings/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/auth/bookings/424242424242')
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

    describe('POST /auth/edituser/:id', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/edituser/424242424242')
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
