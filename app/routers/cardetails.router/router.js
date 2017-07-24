//destructuring assignments instead of data => {items}
const attachTo = (app, data) => {

    const controller = require('./controller').init(data);

    app.get('/cardetails', (req, res) => {
        return res.render('./public/car-details');
    });
};

module.exports = { attachTo };