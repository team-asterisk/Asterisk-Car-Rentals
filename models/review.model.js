const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class Review {
    constructor(model, user) {
        this.author = user.username;
        this.content = model.review;
        this.rating = model.rating;
    }

    get id() {
        return this._id;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this._author = name;
        } else {
            throw new Error('Invalid author');
        }
    }

    get content() {
        return this._content;
    }

    set content(value) {
        const text = convert(value);
        if (validator.validateString(text, size.MIN_TEXT, size.MAX_TEXT)) {
            this._content = text;
        } else {
            throw new Error('Invalid content');
        }
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        const rating = parseInt(value, 10);
        if (typeof rating !== 'number' || (rating < 0 && rating > 5)) {
            throw new Error('Invalid rating');
        }
        this._rating = rating;
    }
}

module.exports = Review;
