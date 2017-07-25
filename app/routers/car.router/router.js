const { Router } = require('express');
const multer = require('../utils/fileupload');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/addcar', (req, res) => {
            return controller.getAddCarForm(req, res);
        })
        .get('/editcar', (req, res) => {
            return controller.getEditCarForm(req, res);
        })
        .post('/addcar', multer.uploadSingle, (req, res) => {
            return controller.addCar(req, res);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };
