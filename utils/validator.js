const validator = {
    validateTypeOf: (value, property, type) => {
        if (typeof value !== type) {
            throw new Error(property + ' is not of type ' + type);
        }
    },
    validateIfEmptyString: (value, property) => {
        if (value === '') {
            throw new Error(property + ' is Empty');
        }
    },
    validateIfNumber: (value, property) => {
        if (Number.isNaN(Number(value))) {
            throw new Error(property + ' is not a Number');
        }
    },
    validateImageExtension: (image) => {
        if (!image || image.length === 0) {
            throw new Error('Invalid image: Only JPG, PNG, Gif and BMP is allowed');
        }

        const pattern = /\.(jpe?g|png|gif|bmp)$/;

        if (!pattern.test(image)) {
            throw new Error('Invalid image: Please upload image with correct extension');
        }
    },
    validateUrl: (url) => {
        if (!url || url.length === 0) {
            throw new Error('Invalid url');
        }
        // copied from http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url#answer-5717133
        const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

        if (!pattern.test(url)) {
            throw new Error('Invalid url');
        }
    },
    validateIfUndefinedOrNull: (value, property) => {
        if (typeof value === 'undefined' || value === null) {
            throw new Error(property + ' is undefined or null');
        }
    },
    validateEmail: (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email)) {
            throw new Error('Invalid Email');
        }
    },
    validatePhone: (phone) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(phone)) {
            throw new Error('Invalid Phone');
        }
    },
    validatePassword: (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        if (!regex.test(password)) {
            throw new Error('Password has to be Minimum 4 characters at least 1 Alphabet and 1 Number');
        }
    },
    validateUsername: (username) => {
        const regex = /^[A-Za-z0-9_-]*[A-Za-z0-9][A-Za-z0-9_-]{3,}$/;
        if (!regex.test(username)) {
            throw new Error('Username must be at least 4 symbols and all should be valid');
        }
    }
};

module.exports = { validator };