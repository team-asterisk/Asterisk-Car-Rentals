const { ObjectID } = require('mongodb');
const carHelper = require('../utils/carHelpers').init();
const userHelper = require('../utils/userHelpers').init();

class BookingsController {
    constructor(data) {
        this.data = data;
    }

    getAddBookingMenu(req, res) {
        const carId = req.params.id;
        return Promise.resolve(this._generateCarData(this.data, carId))
            .then((carInfo) => {
                return res.render('auth/bookings/add', {
                    context: carInfo,
                    req: req,
                });
            });
    }

    searchCars(req, res) {
        const now = new Date();
        const start = new Date(req.query.pickup_date);
        const end = new Date(req.query.dropoff_date);
        const category = !req.query.category ? 'All' : req.query.category;

        // can return empty promise
        return this._searchCarsByQuery(category, now, start, end)
            .then((cars) => {
                if (!cars) {
                    return Promise.reject('No cars found');
                }
                req.toastr.success('Results will appear in a second!', 'Searching...');
                return res.render('./public/search-cars', {
                    context: { cars, start, end },
                    req: req,
                    moment: require('moment'),
                });
            })
            .catch((err) => {
                req.toastr.error('Search was not successfull, please try again' + err, 'Sorry!');
                return res.status(401).redirect('/');
            });
    }

    getEditBookingMenu(req, res) {
        const bookingId = req.params.id;
        const currentBooking = req.user.bookings
            .find((x) => x._id == bookingId);
        const carId = currentBooking.car._id;

        return Promise.resolve(this._generateCarData(this.data, carId))
            .then((carInfo) => {
                return res.render('auth/bookings/edit', {
                    context: {
                        currentBooking,
                        carInfo,
                    },
                    req: req,
                    moment: require('moment'),
                });
            });
    }

    addBooking(req, res, message) {
        const carId = req.params.id;
        const newBooking = req.body;
        newBooking._id = new ObjectID();
        const user = req.user;

        return this.data.cars.findById(carId)
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
                        .then((updated) => {
                            return Promise.resolve(updated);
                        });
                }
                return Promise.reject('Cannot book the car for these dates!');
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
                return res.status(400)
                    .redirect('/auth/bookings/add/' + carId);
            });
    }

    editBooking(req, res, message) {
        const bookingId = req.params.id;
        const newBooking = req.body;
        newBooking._id = new ObjectID();
        const user = req.user;

        const current = req.user.bookings
            .find((x) => x._id == bookingId);

        return this.data.cars.findById(current.car._id)
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
                return res.status(400)
                    .redirect('/auth/bookings/' + bookingId);
            });
    }

    // private methods
    _searchCarsByQuery(category, nowDate, startDate, endDate) {
        const now = nowDate.valueOf() - 24 * 60 * 60 * 1000;
        const start = startDate.valueOf();
        const end = endDate.valueOf();
        // let cars;
        let filteredCars;

        if (isNaN(start) || isNaN(end)) {
            return Promise.reject('Please provide correct dates.');
        }
        if (end > now && now > start) {
            return Promise.reject('Please choose today or a future date.');
        }
        if (end < now) {
            return Promise.reject('Please choose a future date.');
        }
        if (start > end) {
            return Promise.reject('Dropoff date must follow pickup date.');
        }

        if (category === 'All') {
            return Promise.resolve(this.data.cars.getAll())
                .then((cars) => {
                    if (cars) {
                        filteredCars = cars.filter((car) => {
                            return carHelper.checkIfCarIsBooked(car, startDate, endDate);
                        });
                        return Promise.resolve(filteredCars);
                    }
                    return Promise.resolve();
                });
        }

        return Promise.resolve(this.data.cars.filterBy({ 'category': category }))
            .then((cars) => {
                if (cars) {
                    filteredCars = cars.filter((car) => {
                        return carHelper.checkIfCarIsBooked(car, startDate, endDate);
                    });
                    return Promise.resolve(filteredCars);
                }
                return Promise.resolve();
            });
    }

    _generateCarData(data, carId) {
        return Promise.resolve(data.cars.findById(carId))
            .then((car) => {
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
            });
    }
}

const init = (data) => {
    return new BookingsController(data);
};

module.exports = { init };
