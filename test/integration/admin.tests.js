const request = require('supertest');
const expect = require('chai').expect;

describe('-- Cars tests --', () => {
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

    describe('GET /auth/viewbookings', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewbookings')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewcars', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewcars')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewusers', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewusers')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/viewdeals', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/viewdeals')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/edituser/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/edituser/424242424242')
                .expect(302)
                .expect('Location', '/401')
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
