const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .post('cardetails/comment', (req, res) => {
            return controller.addComment(req, res);
        });

    app.use('/', router);
};

module.exports = { attachTo };
