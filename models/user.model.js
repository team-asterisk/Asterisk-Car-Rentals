const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class User {
    constructor(model) {
        this._name = model.name;
        this._username = model.username;
        this._password = model.password;
        this._phone = model.phone;
        this._email = model.email;
        this._role = model.role || 'user';
        this._bookings = model.bookings || [];
    }

    get id() {
        return this._id;
    }

    get _name() {
        return this.name;
    }

    set _name(value) {
        const nameVal = convert(value);
        if (validator.validateString(nameVal, size.MIN_NAME, size.MAX_NAME)) {
            this.name = nameVal;
        } else {
            throw new Error('Invalid name');
        }
    }

    get _username() {
        return this.username;
    }

    set _username(value) {
        const usernameVal = convert(value);
        if (validator.validateString(usernameVal, size.MIN_NAME, size.MAX_NAME)) {
            this.username = usernameVal;
        } else {
            throw new Error('Invalid username');
        }
    }

    get _password() {
        return this.password;
    }

    set _password(value) {
        const passwordVal = convert(value);
        if (validator.validatePassword(passwordVal)) {
            this.password = passwordVal;
        } else {
            throw new Error('Invalid password');
        }
    }

    get _phone() {
        return this.phone;
    }

    set _phone(value) {
        const phoneVal = convert(value);
        if (validator.validatePhone(phoneVal)) {
            this.phone = phoneVal;
        } else {
            throw new Error('Invalid phone number');
        }
    }

    get _email() {
        return this.email;
    }

    set _email(value) {
        const emailVal = convert(value);
        if (validator.validatePhone(emailVal)) {
            this.email = emailVal;
        } else {
            throw new Error('Invalid email');
        }
    }

    get _role() {
        return this.role;
    }

    set _role(value) {
        if (typeof value !== 'string' || ['user', 'admin'].indexOf(value) < 0) {
            throw new Error('Invalid role');
        }
        this.role = value;
    }
}

module.exports = User;
