const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ApiController {
    constructor(data) {
        this.data = data;
        this.carHelper = require('../utils/carHelpers').init();
    }

    getWelcomeMessage(req, res) {
        Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.status(200).send({
                    message: 'Welcome to the Asterisk - Car Rentals API!',
                });
            });
    }

    getCarDetails(req, res) {
        Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.status(200).send({
                    car,
                });
            });
    }

    searchCars(req, res) {
        const start = new Date(req.params.pickupdate);
        const end = new Date(req.params.dropoffdate);

        Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return cars.filter((car) => {
                    return this.carHelper.checkIfCarIsBooked(car, start, end);
                });
            })
            .then((filteredCars) => {
                return res.status(200).send({
                    filteredCars,
                });
            });
    }

    getDeals(req, res) {
        Promise.resolve(this.data.cars.filterBy({ 'specialpriceactivated': '1' }))
            .then((deals) => {
                return res.status(200).send({
                    deals,
                });
            });
    }

    getCars(req, res) {
        Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return res.status(200).send({
                    cars,
                });
            });
    }

    getCarCategory(req, res) {
        const category = req.params.category;
        Promise.resolve(this.data.cars.filterBy({ 'category': category }))
            .then((cars) => {
                return res.status(200).send({
                    cars,
                });
            });
    }

    viewAllBookings(req, res) {
        Promise.resolve(this.data.users.getAll())
            .then((users) => {
                const allBookings = [];
                users.forEach((user) => {
                    if (user.bookings.length > 0) {
                        allBookings.push(...user.bookings);
                    }
                });
                return allBookings;
            })
            .then((bookings) => {
                return res.status(200).send({
                    bookings,
                });
            });
    }

    provideToken(req, res, next) {
        const username = req.params.username;
        const password = req.params.password;
        let token = '';

        console.log(username);
        console.log(password);

        this.data.users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return res.json({ success: false, message: 'Authentication failed. User not found.' });
                }

                if (bcrypt.compareSync(password, user.passHash)) {
                    token = jwt.sign(user, 'superSecret', {
                        algorithm: 'HS256',
                        expiresIn: 60,
                    });

                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                }

                return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            });
    }
}

const init = (data) => {
    return new ApiController(data);
};

module.exports = { init };
