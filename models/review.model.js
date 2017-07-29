const { validator } = require('../utils/validator');
const convert = require('../utils/inputConverter').convert;

class Review {
    constructor(model, user) {
        this._author = user.username;
        this._content = model.review;
        this._rating = model.rating;
    }

    get id() {
        return this._id;
    }

    get _author() {
        return this.author;
    }

    set _author(value) {
        const usernameVal = convert(value);
        validator.validateIfUndefinedOrNull(usernameVal, 'Username');
        validator.validateUsername(usernameVal);
        validator.validateIfEmptyString(usernameVal, 'Username');
        this.author = usernameVal;
    }

    get _content() {
        return this.content;
    }

    set _content(value) {
        const text = convert(value);
        validator.validateIfUndefinedOrNull(text, 'Review');
        validator.validateTypeOf(text, 'Review', 'string');
        validator.validateIfEmptyString(text, 'Review');
        this.content = text;
    }

    get _rating() {
        return this.rating;
    }

    set _rating(value) {
        const rating = parseInt(value, 10);
        validator.validateIfUndefinedOrNull(rating, 'Rating');
        validator.validateIfNumber(rating, 'Rating');
        validator.validateIfEmptyString(rating, 'Rating');
        if (rating < 1 || rating > 5) {
            throw new Error('Invalid Rating');
        }
        this.rating = rating;
    }
}

const initReview = (model, user) => {
    return new Review(model, user);
};

module.exports = { Review, initReview };
