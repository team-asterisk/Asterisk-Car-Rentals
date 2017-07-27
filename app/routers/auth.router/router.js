const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const authController = require('../auth.router/controller').init(data);

    router
        .get('/register', (req, res) => {
            return controller.getRegisterForm(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getLogInForm(req, res);
        })
        .get('/profile', authController.verifyIsUser, (req, res) => {
            return controller.getProfileForm(req, res);
        })
        .get('/bookings', authController.verifyIsUser, (req, res) => {
            return controller.getMyBookings(req, res);
        })
        .post('/profile', authController.verifyIsUser, (req, res) => {
            return controller.updateProfile(req, res);
        })
        .get('/logout', (req, res) => {
            return controller.logOut(req, res);
        })
        .post('/register', (req, res) => {
            return controller.register(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        }));

    app.use('/auth', router);
};

module.exports = { attachTo };
