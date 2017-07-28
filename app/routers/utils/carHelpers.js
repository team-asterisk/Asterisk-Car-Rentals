class CarHelper {
    addBookedDatesToCar(car, start, end, bookingId) {
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

    removeBookedDatesFromCar(car, bookingId) {
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
    checkIfPeriodsCollide(s1, e1, s2, e2) {
        return (s1 >= s2 && s1 <= e2) || (s1 <= s2 && e1 >= s2);
    }

    // this method checks all saved periods for this car
    checkIfCarIsBooked(car, start, end) {
        const booked = car.booked;

        const startdate = start instanceof Date ? start : new Date(start);
        const enddate = end instanceof Date ? end : new Date(end);

        if (booked.length > 0) {
            const len = booked.length;
            for (let i = 0; i < len; i++) {
                const dates = booked[i];
                const startBooking = new Date(dates.startdate);
                const endBooking = new Date(dates.enddate);

                if (this.checkIfPeriodsCollide(
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
    checkOtherDates(car, start, end, ostart, oend) {
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

                if (this.checkIfPeriodsCollide(
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
}

const init = () => {
    return new CarHelper();
};

module.exports = { init };
