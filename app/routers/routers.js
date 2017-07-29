/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        Promise.resolve(data.reviews.getAll())
            .then((items) => {
                return res.render('home', {
                    context: items,
                    req: req,
                });
            });
    });

    app.get('/401', (req, res) => {
        return res.render('public/401', { req: req });
    });

    // console.log(data.reviews);
    // cardetails moved to its own folder

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.get('*', (req, res) => {
        return res.status(404).render('public/404', { req: req });
    });
};

module.exports = { attachTo };
