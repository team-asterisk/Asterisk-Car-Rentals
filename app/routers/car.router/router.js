const { Router } = require('express');
const multer = require('../utils/fileupload');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const authController = require('../auth.router/controller').init(data);

    router
        .get('/auth/addcar', authController.verifyIsAdmin, (req, res) => {
            return controller.getAddCarForm(req, res);
        })
        .get('/auth/editcar/:id', authController.verifyIsAdmin, (req, res) => {
            return controller.getEditCarById(req, res);
        })
        .post('/auth/addcar', authController.verifyIsAdmin, multer.uploadSingle, (req, res) => {
            return controller.addCar(req, res);
        })
        .post('/auth/editcar/:id', authController.verifyIsAdmin, multer.uploadSingle, (req, res) => {
            return controller.updateCar(req, res);
        })
        .get('/cars', (req, res) => {
            return controller.getAllCars(req, res);
        })
        .get('/car/:id', (req, res) => {
            return controller.getSingleCar(req, res);
        })
        .get('/cars/:category', (req, res) => {
            return controller.getCarsFromCategory(req, res);
        })
        .get('/deals', (req, res) => {
            return controller.getAllDeals(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
