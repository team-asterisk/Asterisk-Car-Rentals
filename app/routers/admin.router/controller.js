class AdminController {
    constructor(data) {
        this.data = data;
    }

    getViewBookings(req, res) {
        return res.render('auth/admin/viewbookings', { req: req });
    }

    getViewCars(req, res) {
        Promise.resolve(this.data.cars.getAll())
            .then((cars) => {
                return res.render('auth/admin/viewcars', {
                    context: cars,
                    req: req,
                });
            });
    }

    getViewUsers(req, res) {
        Promise.resolve(this.data.users.getAll())
            .then((user) => {
                return res.render('auth/admin/viewusers', {
                    context: user,
                    req: req,
                });
            });
    }

    getViewDeals(req, res) {
        Promise.resolve(this.data.cars.filterBy({ 'specialpriceactivated': '1' }))
            .then((deals) => {
                return res.render('auth/admin/viewdeals', {
                        context: deals,
                        req: req,
                    },
                );
            });
    }
}

const init = (data) => {
    return new AdminController(data);
};

module.exports = { init };
