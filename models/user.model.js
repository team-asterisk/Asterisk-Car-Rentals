const validator = require('../utils').validator;
const size = require('../utils').constants.size;

class User {
    static isValid(model) {
        const result = ((typeof model !== 'undefined') &&
            validator.validateString(model.name, size.MIN_NAME, size.MAX_NAME) &&
            validator.validateString(model.username, size.MIN_NAME, size.MAX_NAME) &&
            // validator.validateString(model.password, size.MIN_PASS, size.MAX_PASS) &&
            validator.validateEmail(model.email) &&
            validator.validatePhone(model.phone));
        return result;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;
