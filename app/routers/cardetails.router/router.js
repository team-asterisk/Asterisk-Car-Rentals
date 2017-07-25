// destructuring assignments instead of data => {items}
const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/cardetails', (req, res) => {
        controller.getAll(req, res);
    });
};

module.exports = { attachTo };
