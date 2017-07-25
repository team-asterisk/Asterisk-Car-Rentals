const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class User {
    constructor(model) {
        this.name = model.name;
        this.username = model.username;
        this.password = model.password;
        this.phone = model.phone;
        this.email = model.email;
        this.role = model.role || 'user';
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        const nameVal = convert(value);
        if (validator.validateString(nameVal, size.MIN_NAME, size.MAX_NAME)) {
            this._name = nameVal;
        } else {
            throw new Error('Invalid name');
        }
    }

    get username() {
        return this._username;
    }

    set username(value) {
        const usernameVal = convert(value);
        if (validator.validateString(usernameVal, size.MIN_NAME, size.MAX_NAME)) {
            this._username = usernameVal;
        } else {
            throw new Error('Invalid username');
        }
    }

    get password() {
        return this._password;
    }

    set password(value) {
        const passwordVal = convert(value);
        if (validator.validatePassword(passwordVal)) {
            this._password = passwordVal;
        } else {
            throw new Error('Invalid password');
        }
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        const phoneVal = convert(value);
        if (validator.validatePhone(phoneVal)) {
            this._phone = phoneVal;
        } else {
            throw new Error('Invalid phone number');
        }
    }

    get email() {
        return this._email;
    }

    set email(value) {
        const emailVal = convert(value);
        if (validator.validatePhone(emailVal)) {
            this._email = emailVal;
        } else {
            throw new Error('Invalid email');
        }
    }

    get role() {
        return this._role;
    }

    set role(value) {
        if (typeof value !== 'string' || ['user', 'admin'].indexOf(value) < 0) {
            throw new Error('Invalid role');
        }
        this._role = value;
    }
}

module.exports = User;
