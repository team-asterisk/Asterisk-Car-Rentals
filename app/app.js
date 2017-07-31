const express = require('express');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const toastrOptions = require('../utils/constants').toastrOptions;
const multer = require('multer');

const init = (data, config) => {
    const app = express();

    require('./config').applyTo(app);

    // CSRF fix
    const uploadDir = 'static/images/cars/';
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });
    app.use(multer({ storage: storage }).single('carphoto'));
    // multer config before csrf 
    require('./auth').applyTo(app, data, config);

    app.use(flash());
    app.use(toastr(toastrOptions));

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
