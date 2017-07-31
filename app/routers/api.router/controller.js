const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const messages = {
    // eslint-disable-next-line max-len
    failedNotAdmin: 'Authentication failed. User must be admin. Did you buy me a beer!?',
    failedPassword: 'Authentication failed. Wrong password.',
    failedNotFound: 'Authentication failed. User not found.',
};

class ApiController {
    constructor(data) {
        this.data = data;
        this.carHelper = require('../utils/carHelpers').init();
    }

    getWelcomeMessage(req, res) {
        return Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.status(200).send({
                    message: 'Welcome to the Asterisk - Car Rentals API!',
                });
            });
    }

    getCarDetails(req, res) {
        return Promise.resolve(this.data.cars.findById(req.params.id))
            .then((car) => {
                return res.status(200).send({
                    car,
                });
            });
    }

    searchCars(req, res) {
        const start = new Date(req.params.pickupdate);
        const end = new Date(req.params.dropoffdate);

        return Promise.resolve(this.data.cars.getAll())
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
        return Promise.resolve(this.data.cars
                .filterBy({ 'specialpriceactivated': '1' }))
            .then((deals) => {
                return res.status(200).send({
                    deals,
                });
            });
    }

    getCars(req, res) {
        return Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return res.status(200).send({
                    cars,
                });
            });
    }

    getCarCategory(req, res) {
        const category = req.params.category;
        return Promise.resolve(this.data.cars
                .filterBy({ 'category': category }))
            .then((cars) => {
                return res.status(200).send({
                    cars,
                });
            });
    }

    viewAllBookings(req, res) {
        return Promise.resolve(this.data.users.getAll())
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

        return this.data.users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return res.json({
                        success: false,
                        message: messages.failedNotFound,
                    });
                }

                if (user.role !== 'admin') {
                    return res.json({
                        success: false,
                        message: messages.failedNotAdmin,
                    });
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

                return res.json({
                    success: false,
                    message: messages.failedPassword,
                });
            });
    }
}

const init = (data) => {
    return new ApiController(data);
};

module.exports = { init };