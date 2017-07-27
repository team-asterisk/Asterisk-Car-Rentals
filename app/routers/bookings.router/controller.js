const { ObjectID } = require('mongodb');

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
                if (this._checkIfCarIsBooked(car, newBooking.startdate, newBooking.enddate)) {
                    this._addBookedDatesToCar(car, newBooking.startdate, newBooking.enddate, newBooking._id);
                    this.data.cars.updateById(car);
                    return car;
                }
                throw new Error('Cannot book the car for these dates!');
            })
            .then((car) => {
                return this._addBookingToUser(car, user, newBooking);
            })
            .then((updatedUser) => {
                return this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success(message, 'Thank you!');
                return res.redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                setTimeout(() => {
                    return res.redirect('/auth/bookings/add/' + carId);
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
                this._removeBookedDatesFromCar(car, bookingId);
                if (this._checkIfCarIsBooked(car, newBooking.startdate, newBooking.enddate)) {
                    this._addBookedDatesToCar(car, newBooking.startdate, newBooking.enddate, newBooking._id);
                    this.data.cars.updateById(car);
                    return car;
                }
                throw new Error('Cannot book the car for these dates!');
            })
            .then((car) => {
                return this._addBookingToUser(car, user, newBooking);
            })
            .then((sameUser) => {
                return this._removeBookingFromUser(sameUser, bookingId);
            })
            .then((updatedUser) => {
                return this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success(message, 'Thank you!');
                return res.redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                setTimeout(() => {
                    return res.redirect('/auth/bookings/' + bookingId);
                }, 1000);
            });
    }

    _addBookedDatesToCar(car, start, end, bookingId) {
        const startdate = new Date(start);
        const enddate = new Date(end);

        const booked = {
            _id: bookingId,
            startdate,
            enddate,
        };

        car.booked.push(booked);
        return car;
    }

    _removeBookedDatesFromCar(car, bookingId) {
        const index = car.booked.indexOf(car.booked.find((x) => x._id === bookingId));
        car.booked.splice(index, 1);
        return car;
    }

    _checkIfCarIsBooked(car, start, end) {
        const booked = car.booked;

        const startdate = new Date(start);
        const enddate = new Date(end);

        if (booked.length > 0) {
            booked.forEach((dates) => {
                const startBooking = new Date(dates.startdate);
                const endBooking = new Date(dates.enddate);
                if ((startBooking.valueOf() <= startdate.valueOf() &&
                        endBooking.valueOf() >= startdate.valueOf()) ||
                    (startBooking.valueOf() >= startdate.valueOf() &&
                        startBooking.valueOf() <= enddate.valueOf())) {
                    throw new Error('Cannot book the car for these dates!');
                }
            });
        }
        return true;
    }

    _removeBookingFromUser(user, bookingId) {
        const currentBookingIndex = user.bookings
            .indexOf(user.bookings
                .find((x) => x._id == bookingId));

        if (currentBookingIndex >= 0) {
            user.bookings.splice(currentBookingIndex, 1);
        }

        return Promise.resolve(user);
    }

    _addBookingToUser(car, user, newBooking) {
        if (!car) {
            throw new Error('This car does not exist!');
        }

        const startdate = new Date(newBooking.startdate);
        const enddate = new Date(newBooking.enddate);

        // https://goo.gl/1L8HUi
        const totalDays = Math.round((enddate.valueOf() - startdate.valueOf()) / (1000 * 60 * 60 * 24));
        let total = totalDays * car.baseprice;

        if (+car.specialpriceactivated === 1) {
            total = totalDays * car.specialprice;
        }

        const booking = {
            _id: newBooking._id,
            car: {
                makemodel: car.makemodel,
                _id: car._id,
            },
            startdate,
            enddate,
            totalprice: total.toFixed(2),
        };

        user.bookings.push(booking);

        const updatedUser = user;

        return Promise.resolve(updatedUser);
    }
}

const init = (data) => {
    return new BookingsController(data);
};

module.exports = { init };
