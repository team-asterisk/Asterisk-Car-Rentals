const request = require('supertest');
const expect = require('chai').expect;

const config = require('./config');
const { Server } = require('./../../server');

describe('-- API tests --', () => {
    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
            .then((obj) => {
                app = obj.app;
            });
    });

    describe('GET /api/cars', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/cars')
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /api/deals', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/deals')
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /api/cars/:category', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/cars/Economys')
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /api/car/:id', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/car/597b3fde41263123e8aa0d66')
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /api/searchcars/:pickupdate/:dropoffdate', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/searchcars/10-08-2017/12-08-2017')
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
