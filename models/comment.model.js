const { validator } = require('../utils/validator');
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
        validator.validateIfUndefinedOrNull(text, 'Comment');
        validator.validateTypeOf(text, 'Comment', 'string');
        validator.validateIfEmptyString(text, 'Comment');
        this.content = text;
    }
}

const initComment = (model, user) => {
    return new Comment(model, user);
};

module.exports = { Comment, initComment };
