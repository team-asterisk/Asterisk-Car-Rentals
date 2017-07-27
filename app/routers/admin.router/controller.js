class AdminController {
    constructor(data) {
        this.data = data;
    }

    getViewBookings(req, res) {
        Promise.resolve(this.data.users.getAll())
            .then((users) => {
                return res.render('auth/admin/viewbookings', {
                    context: users,
                    req: req,
                    moment: require('moment'),
                });
            });
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
                }, );
            });
    }

    getEditUserByIdForm(req, res) {
        Promise.resolve(this.data.users.findById(req.params.id))
            .then((user) => {
                return res.render('auth/admin/edituser', {
                    user,
                    req: req,
                });
            });
    }

    updateUserProfile(req, res) {
        const bodyUser = req.body;
        return this._updateUserProperties(req.params.id, bodyUser)
            .then((user) => {
                return this.data.users.updateById(user);
            })
            .then(() => {
                return res.redirect('/auth/viewusers');
            })
            .catch((err) => {
                req.toastr.error(err.message);
                return res.redirect('/auth/viewusers');
            });
    }

    _updateUserProperties(userId, user) {
        return this.data.users.findById(userId)
            .then((dbUser) => {
                user._id = dbUser._id;
                user.username = dbUser.username;
                user.role = dbUser.role;
                user.bookings = dbUser.bookings;
                user.passHash = dbUser.passHash;

                return Promise.resolve(user);
            });
    }
}

const init = (data) => {
    return new AdminController(data);
};

module.exports = { init };