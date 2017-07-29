const validator = require('../utils').validator;
const size = require('../utils').constants.size;
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
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this.author = name;
        } else {
            throw new Error('Invalid author');
        }
    }

    get _content() {
        return this.content;
    }

    set _content(value) {
        const text = convert(value);
        if (validator.validateString(text, size.MIN_TEXT, size.MAX_TEXT)) {
            this.content = text;
        } else {
            throw new Error('Invalid content');
        }
    }

    get _rating() {
        return this.rating;
    }

    set _rating(value) {
        const rating = parseInt(value, 10);
        if (typeof rating !== 'number' || (rating < 0 && rating > 5)) {
            throw new Error('Invalid rating');
        }
        this.rating = rating;
    }
}

const initReview = (model, user) => {
    return new Review(model, user);
};

module.exports = { Review, initReview };
