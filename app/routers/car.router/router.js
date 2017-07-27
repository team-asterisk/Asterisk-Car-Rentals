const { Router } = require('express');
const multer = require('../utils/fileupload');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/auth/addcar', (req, res) => {
            return controller.getAddCarForm(req, res);
        })
        .get('/auth/editcar', (req, res) => {
            return controller.getEditCarForm(req, res);
        })
        .get('/auth/editcar/:id', (req, res) => {
            return controller.getEditCarById(req, res);
        })
        .post('/auth/addcar', multer.uploadSingle, (req, res) => {
            return controller.addCar(req, res);
        })
        .post('/auth/editcar/:id', multer.uploadSingle, (req, res) => {
            return controller.editCar(req, res);
        })
        .get('/cars', (req, res) => {
            return controller.getAllCars(req, res);
        })
        .get('/car/:id', (req, res) => {
            return controller.getSingleCar(req, res);
        })
        .get('/searchcars', (req, res) => {
            return res.render('./public/search-cars');
        })
        .get('/deals', (req, res) => {
            return controller.getAllDeals(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };
