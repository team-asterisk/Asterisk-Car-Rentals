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
            return res.status(401).redirect('/');
        }

        console.log('--------- final');
        console.log(cars);

        return res.render('./public/search-cars', {
            context: { cars, start, end },
            req: req,
            moment: require('moment'),
        });
    }

    async _searchCarsByQuery(category, nowDate, startDate, endDate) {
        const now = nowDate.valueOf() - 24 * 60 * 60 * 1000;
        const start = startDate.valueOf();
        const end = endDate.valueOf();
        let cars;
        let filteredCars;

        console.log('--------- test');
        console.log(nowDate);
        console.log(startDate);
        console.log(endDate);
        console.log(category);

        if (start < now) {
            throw new Error('Please choose today or a future date.');
        }
        if (end < now) {
            throw new Error('Please choose a future date.');
        }
        if (start > end) {
            throw new Error('Dropoff date must follow pickup date.');
        }

        console.log('--------- cars');

        if (category === 'All') {
            cars = await this.data.cars.getAll();
        } else {
            cars = await this.data.cars.filterBy({ 'category': category });
        }

        console.log(cars);
        console.log('-------------- filter');

        if (cars) {
            filteredCars = await cars.filter((car) => {
                return this._checkIfCarIsBooked(car, startDate, endDate);
            });
        }

        console.log(filteredCars);

        return filteredCars;
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
                if (this._checkIfCarIsBooked(
                        car,
                        newBooking.startdate,
                        newBooking.enddate
                    )) {
                    this._addBookedDatesToCar(
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
                return this._addBookingToUser(car, user, newBooking);
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
                    return res.status(400).redirect('/auth/bookings/add/' + carId);
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
                if (this._checkOtherDates(
                        car,
                        newBooking.startdate,
                        newBooking.enddate,
                        current.startdate,
                        current.enddate
                    )) {
                    this._addBookedDatesToCar(
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
                return res.status(200).redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                setTimeout(() => {
                    return res.status(400).redirect('/auth/bookings/' + bookingId);
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
        const index = car.booked.indexOf(
            car.booked
            .find((x) => x._id === bookingId));

        car.booked
            .splice(index, 1);
        return car;
    }

    // checks if 2 periods overlap or contain each other
    // s1, e1 - (start, end of first period)
    // s2, e2 - (start, end of second period)
    _checkIfPeriodsCollide(s1, e1, s2, e2) {
        return ((s1 >= s2 && s1 <= e2) || (s1 <= s2 && e1 >= s2));
    }

    // this method checks all saved periods for this car
    _checkIfCarIsBooked(car, start, end) {
        const booked = car.booked;

        const startdate = start instanceof Date ? start : new Date(start);
        const enddate = end instanceof Date ? end : new Date(end);

        if (booked.length > 0) {
            const len = booked.length;
            for (let i = 0; i < len; i++) {
                const dates = booked[i];
                const startBooking = new Date(dates.startdate);
                const endBooking = new Date(dates.enddate);
                if (this._checkIfPeriodsCollide(
                        startBooking.valueOf(),
                        endBooking.valueOf(),
                        startdate.valueOf(),
                        enddate.valueOf()
                    )) {
                    return false;
                }
            }
        }
        return true;
    }

    // this method excludes current booking period
    _checkOtherDates(car, start, end, ostart, oend) {
        const booked = car.booked;

        const startdate = new Date(start);
        const enddate = new Date(end);
        const oldstart = new Date(ostart);
        const oldend = new Date(oend);

        if (booked.length > 0) {
            const len = booked.length;
            for (let i = 0; i < len; i++) {
                const dates = booked[i];
                const startBooking = new Date(dates.startdate);
                const endBooking = new Date(dates.enddate);

                if (startBooking.valueOf() === oldstart.valueOf() &&
                    endBooking.valueOf() === oldend.valueOf()) {
                    continue;
                }

                if (this._checkIfPeriodsCollide(
                        startBooking.valueOf(),
                        endBooking.valueOf(),
                        startdate.valueOf(),
                        enddate.valueOf()
                    )) {
                    return false;
                }
            }
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

        const totalDays = Math.round((
                enddate.valueOf() -
                startdate.valueOf()) /
            (1000 * 60 * 60 * 24));

        let total = totalDays * car.baseprice;

        if (+car.specialpriceactivated === 1) {
            total = totalDays * car.specialprice;
        }

        if (isNaN(total)) {
            throw new Error('Empty date is not allowed!');
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
