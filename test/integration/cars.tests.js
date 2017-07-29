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

    describe('GET /cars', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/cars')
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

    describe('GET /deals', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/deals')
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

    describe('GET /cars/:category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/cars/Economy')
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

    describe('GET /car/:id', () => {
        it('expect to return 404 car not found', (done) => {
            request(app)
                .get('/car/252525252525')
                .expect('Content-type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/addcar', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/addcar')
                .expect(302)
                .expect('Location', '/401')
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }

                    done();
                });
        });
    });

    describe('POST /auth/addcar', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/addcar')
                .expect(403)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /auth/editcar/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/editcar/424242424242')
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

    describe('POST /auth/editcar/:id', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/editcar/424242424242')
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
