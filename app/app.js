const express = require('express');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const toastrOptions = require('../utils/constants').toastrOptions;

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

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
