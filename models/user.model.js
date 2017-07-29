const convert = require('../utils/inputConverter').convert;
const { validator } = require('../utils/validator');

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
        validator.validateIfUndefinedOrNull(nameVal, 'Name');
        validator.validateTypeOf(nameVal, 'Name', 'string');
        validator.validateIfEmptyString(nameVal, 'Name');
        this.name = nameVal;
    }

    get _username() {
        return this.username;
    }

    set _username(value) {
        const usernameVal = convert(value);
        validator.validateIfUndefinedOrNull(usernameVal, 'Username');
        validator.validateUsername(usernameVal);
        validator.validateIfEmptyString(usernameVal, 'Username');
        this.username = usernameVal;
        
    }

    get _password() {
        return this.password;
    }

    set _password(value) {
        const passwordVal = convert(value);
        validator.validateIfUndefinedOrNull(passwordVal, 'Password');
        validator.validatePassword(passwordVal);
        validator.validateIfEmptyString(passwordVal, 'Password');
        this.password = passwordVal;
    }

    get _phone() {
        return this.phone;
    }

    set _phone(value) {
        const phoneVal = convert(value);
        validator.validateIfUndefinedOrNull(phoneVal, 'Phone');
        validator.validatePhone(phoneVal);
        validator.validateIfEmptyString(phoneVal, 'Phone');
        this.phone = phoneVal;
    }

    get _email() {
        return this.email;
    }

    set _email(value) {
        const emailVal = convert(value);
        validator.validateIfUndefinedOrNull(emailVal, 'Email');
        validator.validateEmail(emailVal);
        validator.validateIfEmptyString(emailVal, 'Email');
        this.email = emailVal;
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

    get _bookings() {
        return this.bookings;
    }

    set _bookings(val) {
        // validate
        this.bookings = val;
    }
}


const initUser = (model) => {
    return new User(model);
};

module.exports = { User, initUser };
