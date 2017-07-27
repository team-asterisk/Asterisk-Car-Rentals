const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const authController = require('../auth.router/controller').init(data);

    router
        .get('/viewbookings', authController.verifyIsAdmin, (req, res) => {
            return controller.getViewBookings(req, res);
        })
        .get('/viewcars', authController.verifyIsAdmin, (req, res) => {
            return controller.getViewCars(req, res);
        })
        .get('/viewusers', authController.verifyIsAdmin, (req, res) => {
            return controller.getViewUsers(req, res);
        })
        .get('/viewdeals', authController.verifyIsAdmin, (req, res) => {
            return controller.getViewDeals(req, res);
        })
        .get('/edituser/:id', authController.verifyIsAdmin, (req, res) => {
            return controller.getEditUserByIdForm(req, res);
        })
        .post('/edituser/:id', authController.verifyIsAdmin, (req, res) => {
            return controller.updateUserProfile(req, res);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };
