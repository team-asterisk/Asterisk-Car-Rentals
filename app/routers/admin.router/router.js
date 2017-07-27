const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/viewbookings', (req, res) => {
            return controller.getViewBookings(req, res);
        })
        .get('/viewcars', (req, res) => {
            return controller.getViewCars(req, res);
        })
        .get('/viewusers', (req, res) => {
            return controller.getViewUsers(req, res);
        })
        .get('/viewdeals', (req, res) => {
            return controller.getViewDeals(req, res);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };
