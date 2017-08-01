class UserHelper {
    removeBookingFromUser(user, bookingId) {
        const currentBookingIndex = user.bookings
            .indexOf(user.bookings
                // eslint-disable-next-line eqeqeq
                .find((x) => x._id == bookingId));

        if (currentBookingIndex >= 0) {
            user.bookings.splice(currentBookingIndex, 1);
        }

        return Promise.resolve(user);
    }

    addBookingToUser(car, user, newBooking) {
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

const init = () => {
    return new UserHelper();
};

module.exports = { init };
