const { ObjectID } = require('mongodb');
const carHelper = require('../utils/carHelpers').init();
const userHelper = require('../utils/userHelpers').init();

class BookingsController {
    constructor(data) {
        this.data = data;
    }

    async getAddBookingMenu(req, res) {
        const carId = req.params.id;
        const carInfo = await this._generateCarData(this.data, carId);

        return res.render('auth/bookings/add', {
            context: carInfo,
            req: req,
        });
    }

    async searchCars(req, res) {
        const now = new Date();
        const start = new Date(req.query.pickup_date);
        const end = new Date(req.query.dropoff_date);
        const category = !req.query.category ? 'All' : req.query.category;

        let cars;

        try {
            cars = await this._searchCarsByQuery(category, now, start, end);
        } catch (err) {
            req.toastr.error('Search was not successfull, please try again' + err, 'Sorry!');
            res.status(401).redirect('/');
        }

        req.toastr.success('Results will appear in a second!', 'Searching...');
        res.render('./public/search-cars', {
            context: { cars, start, end },
            req: req,
            moment: require('moment'),
        });
    }

    async getEditBookingMenu(req, res) {
        const bookingId = req.params.id;
        const currentBooking = req.user.bookings
            .find((x) => x._id == bookingId);
        const carId = currentBooking.car._id;
        const carInfo = await this._generateCarData(this.data, carId);

        return res.render('auth/bookings/edit', {
            context: {
                currentBooking,
                carInfo,
            },
            req: req,
            moment: require('moment'),
        });
    }

    addBooking(req, res, message) {
        const carId = req.params.id;
        const newBooking = req.body;
        newBooking._id = new ObjectID();
        const user = req.user;

        this.data.cars.findById(carId)
            .then((car) => {
                if (carHelper.checkIfCarIsBooked(
                        car,
                        newBooking.startdate,
                        newBooking.enddate
                    )) {
                    carHelper.addBookedDatesToCar(
                        car,
                        newBooking.startdate,
                        newBooking.enddate,
                        newBooking._id
                    );

                    return this.data.cars.updateById(car)
                        .then(() => {
                            return car;
                        });
                }
                throw new Error('Cannot book the car for these dates!');
            })
            .then((car) => {
                return userHelper.addBookingToUser(car, user, newBooking);
            })
            .then((updatedUser) => {
                return this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success(message, 'Thank you!');
                return res.status(200).redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                setTimeout(() => {
                    return res.status(400)
                        .redirect('/auth/bookings/add/' + carId);
                }, 1000);
            });
    }

    editBooking(req, res, message) {
        const bookingId = req.params.id;
        const newBooking = req.body;
        newBooking._id = new ObjectID();
        const user = req.user;

        const current = req.user.bookings
            .find((x) => x._id == bookingId);

        this.data.cars.findById(current.car._id)
            .then((car) => {
                carHelper.removeBookedDatesFromCar(car, bookingId);
                if (carHelper.checkOtherDates(
                        car,
                        newBooking.startdate,
                        newBooking.enddate,
                        current.startdate,
                        current.enddate
                    )) {
                    carHelper.addBookedDatesToCar(
                        car,
                        newBooking.startdate,
                        newBooking.enddate,
                        newBooking._id
                    );

                    return this.data.cars.updateById(car)
                        .then(() => {
                            return car;
                        });
                }
                throw new Error('Cannot book the car for these dates!');
            })
            .then((car) => {
                return userHelper.addBookingToUser(car, user, newBooking);
            })
            .then((sameUser) => {
                return userHelper.removeBookingFromUser(sameUser, bookingId);
            })
            .then((updatedUser) => {
                return this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success(message, 'Thank you!');
                return res.status(200).redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                setTimeout(() => {
                    return res.status(400)
                        .redirect('/auth/bookings/' + bookingId);
                }, 1000);
            });
    }

    // private methods
    async _searchCarsByQuery(category, nowDate, startDate, endDate) {
        const now = nowDate.valueOf() - 24 * 60 * 60 * 1000;
        const start = startDate.valueOf();
        const end = endDate.valueOf();
        let cars;
        let filteredCars;

        if (isNaN(start) || isNaN(end)) {
            throw new Error('Please provide correct dates.');
        }
        if (start < now) {
            throw new Error('Please choose today or a future date.');
        }
        if (end < now) {
            throw new Error('Please choose a future date.');
        }
        if (start > end) {
            throw new Error('Dropoff date must follow pickup date.');
        }

        if (category === 'All') {
            cars = await this.data.cars.getAll();
        } else {
            cars = await this.data.cars.filterBy({ 'category': category });
        }

        if (cars) {
            filteredCars = await cars.filter((car) => {
                return carHelper.checkIfCarIsBooked(car, startDate, endDate);
            });
        }

        return filteredCars;
    }

    async _generateCarData(data, carId) {
        const car = await data.cars.findById(carId);

        const viewModel = {
            car: {
                id: carId,
                makemodel: car.makemodel,
                baseprice: car.baseprice,
                specialprice: car.specialprice,
                specialpriceactivated: car.specialpriceactivated,
            },
        };

        return viewModel;
    }
}

const init = (data) => {
    return new BookingsController(data);
};

module.exports = { init };
