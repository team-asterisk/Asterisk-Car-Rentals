const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/register', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .post('/logout', (req, res) => {
            return controller.signOut(req, res);
        })
        .post('/register', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        }));

    app.use('/auth', router);
};

module.exports = { attachTo };
