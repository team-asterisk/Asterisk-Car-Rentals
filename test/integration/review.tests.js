const request = require('supertest');
const expect = require('chai').expect;

const config = require('./config');
const { Server } = require('./../../server');

describe('-- Review tests --', () => {
    const connectionString = 'mongodb://localhost/car-rentals-db-tests';
    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /auth/review', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/review')
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

    describe('POST /auth/review', () => {
        it('expect to return 403', (done) => {
            request(app)
                .post('/auth/review')
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