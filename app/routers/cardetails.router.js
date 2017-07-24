//destructuring assignments instead of data => {items}
const attachTo = (app, { cars }) => {
    app.get('/cardetails', (req, res) => {
        return res.render('./public/car-details');
    });
};

module.exports = { attachTo };