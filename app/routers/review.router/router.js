const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const authController = require('../auth.router/controller').init(data);

    router
        .get('/review', authController.verifyIsUser, (req, res) => {
            return controller.getReviewForm(req, res);
        })
        .post('/review', authController.verifyIsUser, (req, res) => {
            return controller.addReview(req, res);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };
