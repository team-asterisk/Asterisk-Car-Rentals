class BookingsController {
    constructor(data) {
        this.data = data;
    }

    async getAddBookingMenu(req, res) {
        const carId = req.params.id;
        const viewModel = await this._generateViewModel(this.data, carId);

        return res.render('auth/bookings/add', {
            context: viewModel,
            req: req,
        });
    }

    async _generateViewModel(data, carId) {
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

    getEditBookingMenu(req, res) {
        const carId = req.params.id;
        const currentBooking = req.user.bookings
            .find((x) => x.id === carId);

        return res.render('auth/bookings/:id', {
            context: { currentBooking },
            req: req,
        });
    }

    addBooking(req, res) {
        const carId = req.params.id;
        const newBooking = req.body;
        const user = req.user;

        this.data.cars.findById(carId)
            .then((car) => {
                this._addOrReplaceBookingToUser(car, user, newBooking);
            })
            .then((updatedUser) => {
                this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success('Car booking was successful!', 'Thank you!');
                return res.redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/auth/bookings');
            });
    }

    editBooking(req, res) {
        const carId = req.params.id;
        const newBooking = req.body;
        const user = req.user;

        this.data.cars.findById(carId)
            .then((car) => {
                this._addOrReplaceBookingToUser(car, user, newBooking);
            })
            .then((updatedUser) => {
                this.data.users.updateById(updatedUser);
            })
            .then(() => {
                req.toastr.success('Successfully edited your booking!', 'Thank you!');
                // can send e-mail here
                return res.redirect('/auth/bookings');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/auth/bookings');
            });
    }

    _addOrReplaceBookingToUser(car, user, newBooking) {
        if (!car) {
            throw new Error('This car does not exist!');
        }

        const carmodel = car.model;
        const startdate = new Date(newBooking.startdate);
        const enddate = new Date(newBooking.startdate);
        // https://goo.gl/1L8HUi
        const totalDays = Math.round((enddate - startdate) / (1000 * 60 * 60 * 24));
        let total = totalDays * car.baseprice;

        if (+car.specialpriceactivated === 1) {
            total = totalDays * car.specialprice;
        }

        const booked = car.booked;
        if (booked.length) {
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

        const booking = { carmodel, carId: car.id, startdate, enddate, total };
        const currentBookingIndex = user.bookings
            .indexOf(user.bookings
                .find((x) => x.carId === booking.carId));
        if (currentBookingIndex >= 0) {
            user.bookings.splice(currentBookingIndex, 1);
        }

        const updatedUser = user.bookings.push(booking);
        Promise.resolve(updatedUser);
    }
}

const init = (data) => {
    return new BookingsController(data);
};

module.exports = { init };
