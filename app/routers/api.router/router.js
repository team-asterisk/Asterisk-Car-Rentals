const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const authController = require('../auth.router/controller').init(data);

    router
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
        .get('/auth/bookings', authController.verifyIsAdmin, (req, res) => {
            return controller.viewAllBookings(req, res);
        });

    app.use('/api', router);
};

module.exports = { attachTo };
