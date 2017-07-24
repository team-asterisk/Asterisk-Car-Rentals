/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('home');
    });

    //cardetails moved to its own folder
    
    app.get('/cars', (req, res) => {
        return res.render('./public/cars');
    });

    app.get('/searchcars', (req, res) => {
        return res.render('./public/search-cars');
    });

    app.get('/deals', (req, res) => {
        return res.render('./public/deals');
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };
