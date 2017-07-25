const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/comment', (req, res) => {
            return res.redirect('/cardetails');
        })
        .post('/comment', (req, res) => {
            return controller.addComment(req, res);
        });

    app.use('/cardetails', router);
};

module.exports = { attachTo };
