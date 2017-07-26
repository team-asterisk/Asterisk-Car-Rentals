const { Router } = require('express');
const messages = {
    add: 'Thank you for booking this car!',
    edit: 'Successfully edited booking dates!',
};

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/add/:id', (req, res) => {
            return controller.getAddBookingMenu(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getEditBookingMenu(req, res);
        })
        .post('/add/:id', (req, res) => {
            return controller.addBooking(req, res, messages.add);
        })
        .post('/:id', (req, res) => {
            return controller.editBooking(req, res, messages.edit);
        });

    app.use('/auth/bookings', router);
};

module.exports = { attachTo };
