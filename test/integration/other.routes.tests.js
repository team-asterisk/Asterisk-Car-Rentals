const request = require('supertest');
const expect = require('chai').expect;

const config = require('./config');
const { Server } = require('./../../server');

describe('-- Other routes tests --', () => {
    const connectionString = 'mongodb://localhost/car-rentals-db-tests';
    let app = null;

    beforeEach(() => {
        const server = new Server();
        return server.getApp(config)
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

    // describe('POST /auth/login', () => {
    //     it('expect to return 200', (done) => {
    //         request(app)
    //             .post('/auth/login')
    //             .expect('Content-type', /html/)
    //             .send({ username: 'cecee', password: 'cecee05' })
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) {
    //                     done(err);
    //                 }

    //                 done();
    //             });
    //     });
    // });

    describe('GET /MissingRoute', () => {
        it('should return 404', (done) => {
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
