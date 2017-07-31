const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const verifyToken = require('../utils/apiTokenVerify.js');

    router
        .get('/', (req, res) => {
            return controller.getWelcomeMessage(req, res);
        })
        .get('/car/:id', (req, res) => {
            return controller.getCarDetails(req, res);
        })
        .get('/searchcars/:pickupdate/:dropoffdate', (req, res) => {
            return controller.searchCars(req, res);
        })
        .get('/deals', (req, res) => {
            return controller.getDeals(req, res);
        })
        .get('/cars', (req, res) => {
            return controller.getCars(req, res);
        })
        .get('/cars/:category', (req, res) => {
            return controller.getCarCategory(req, res);
        })
        .get('/auth/bookings', verifyToken, (req, res) => {
            return controller.viewAllBookings(req, res);
        })
        .get('/authenticate/:username/:password', (req, res) => {
            return controller.provideToken(req, res);
        });
    // to use form authentication intead of get
    // .post('/authenticate', (req, res, next) => {
    //     return controller.provideToken(req, res, next);
    // });

    app.use('/api', router);
};

module.exports = { attachTo };
