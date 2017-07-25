const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class Comment {
    constructor(model, user) {
        this._author = user.username;
        this._content = model.comment;
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
}

module.exports = Comment;
