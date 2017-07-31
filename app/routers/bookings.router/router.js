const { Router } = require('express');

const attachTo = (app, data, io) => {
    const router = new Router();
    const controller = require('./controller').init(data, io);
    const authController = require('../auth.router/controller').init(data, io);

    router
        .get('/searchcars', (req, res) => {
            return controller.searchCars(req, res);
        })
        .get('/auth/bookings/add/:id', authController.verifyIsUser, (req, res) => {
            return controller.getAddBookingMenu(req, res);
        })
        .get('/auth/bookings/:id', authController.verifyIsUser, (req, res) => {
            return controller.getEditBookingMenu(req, res);
        })
        .post('/auth/bookings/add/:id', authController.verifyIsUser, (req, res) => {
            return controller.addBooking(req, res);
        })
        .post('/auth/bookings/:id', authController.verifyIsUser, (req, res) => {
            return controller.editBooking(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
