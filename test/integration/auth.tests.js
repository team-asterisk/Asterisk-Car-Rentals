const request = require('supertest');
const expect = require('chai').expect;

const config = require('./config');
const { Server } = require('./../../server');

describe('-- Auth tests --', () => {
    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
            .then((obj) => {
                app = obj.app;
            });
    });

    describe('GET /auth/register', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/register')
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

    describe('POST /auth/register', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/register')
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

    describe('GET /auth/login', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/login')
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

    describe('POST /auth/login', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/login')
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

    describe('GET /auth/profile', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/profile')
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

    describe('POST /auth/profile', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/profile')
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

    describe('GET /auth/bookings', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/bookings')
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

    describe('GET /auth/logout', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/logout')
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
});
