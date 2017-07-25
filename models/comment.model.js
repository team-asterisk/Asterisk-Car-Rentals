const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class Comment {
    constructor(model, user) {
        this.author = user.username;
        this.content = model.comment;
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
}

module.exports = Comment;
