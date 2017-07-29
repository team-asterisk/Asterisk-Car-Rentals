const expect = require('chai').expect;
const { validator } = require('../../../utils/validator');

describe('Validation tests', () => {
    let undefinedArgument; // Undefined argument
    const name = 'Dan4o';
    const property = 'Name';
    const typeString = 'string';
    const typeArray = 'Array';
    const validString = 'valid string';
    const validNumber = 123;
    const inValidNumber = 'ds54';
    const validEmail = 'proba@proba.com';
    const inValidEmail = '@proba@proba.com';
    const validPhone = '0898998877';
    const inValidPhone = '230-34_23';
    const validUsername = 'user1';
    const inValidUsername = 'dan'; // Valid Username must be at least 4 symbols
    const validPassword = 'dandan13';
    const inValidPassword = 'da1'; // Valid Password must be at least 4 symbols
    const photoLink = 'car-photo.png';
    const invalidPhotoLink = 'car-photo.svg';
    const url = 'http://www.telerik.com';
    const invalidUrl = 'fdf.com';

    describe('String validation tests', () => {
        it('validateIfEmptyString should not throw when valid non empty string is provided', () => {
            expect(() => validator.validateIfEmptyString(validString)).to.not.throw();
        });

        it('validateIfEmptyString should throw when empty string is provided', () => {
            expect(() => validator.validateIfEmptyString('')).to.throw(/is Empty/);
        });
    });

    describe('Type validation tests', () => {
        it('validateTypeOf should not throw when valid argument is provided', () => {
            expect(() => validator.validateTypeOf(name, property, typeString)).to.not.throw();
        });

        it('validateTypeOf should throw when the argument provided is of different than expected Type', () => {
            expect(() => validator.validateTypeOf(name, property, typeArray)).to.throw(/is not of type/);
        });
    });

    describe('Undefined or Null validation tests', () => {
        it('validateIfUndefinedOrNull should not throw when valid argument is provided', () => {
            expect(() => validator.validateIfUndefinedOrNull(name, property)).to.not.throw();
        });

        it('validateIfUndefinedOrNull should throw when the argument provided is undefined', () => {
            expect(() => validator.validateIfUndefinedOrNull(undefinedArgument, property)).to.throw(/is undefined or null/);
        });

        it('validateIfUndefinedOrNull should throw when the argument provided is null', () => {
            expect(() => validator.validateIfUndefinedOrNull(null, property)).to.throw(/is undefined or null/);
        });
    });

    describe('Photo Extension validation tests', () => {
        it('validateImageExtension should not throw when valid argument is provided', () => {
            expect(() => validator.validateImageExtension(photoLink)).to.not.throw();
        });

        it('validateImageExtension should throw when the argument provided has invalid length', () => {
            expect(() => validator.validateImageExtension('')).to.throw(/Invalid image length/);
        });

        it('validateImageExtension should throw when the argument provided is invalid', () => {
            expect(() => validator.validateImageExtension(invalidPhotoLink)).to.throw(/Invalid extension/);
        });
    });

    describe('Url validation tests', () => {
        it('validateUrl should not throw when valid argument is provided', () => {
            expect(() => validator.validateUrl(url)).to.not.throw();
        });

        it('validateUrl should throw when the argument provided has invalid length', () => {
            expect(() => validator.validateUrl('')).to.throw(/Invalid url length/);
        });

        it('validateUrl should throw when the argument provided is invalid', () => {
            expect(() => validator.validateUrl(invalidUrl)).to.throw(/Invalid url/);
        });
    });

    describe('Number validation tests', () => {
        it('validateIfNumber should not throw when valid argument is provided', () => {
            expect(() => validator.validateIfNumber(validNumber, property)).to.not.throw();
        });

        it('validateIfNumber should throw when the argument provided is not a Number', () => {
            expect(() => validator.validateIfNumber(inValidNumber, property)).to.throw(/is not a Number/);
        });
    });

    describe('Email validation tests', () => {
        it('validateEmail should not throw when valid Email is provided', () => {
            expect(() => validator.validateEmail(validEmail)).to.not.throw();
        });
        
        it('validateEmail should throw when invalid Email is provided', () => {
            expect(() => validator.validateEmail(inValidEmail)).to.throw(/Invalid Email/);
        });
    });

    describe('Phone validation tests', () => {
        it('validatePhone should not throw when valid Phone is provided', () => {
            expect(() => validator.validatePhone(validPhone)).to.not.throw();
        });
        
        it('validatePhone should throw when invalid Phone is provided', () => {
            expect(() => validator.validatePhone(inValidPhone)).to.throw(/Invalid Phone/);
        });
    });

    describe('Username validation tests', () => {
        it('validateUsername should not throw when valid Username is provided', () => {
            expect(() => validator.validateUsername(validUsername)).to.not.throw();
        });
        
        it('validateUsername should throw when short Username is provided', () => {
            expect(() => validator.validateUsername(inValidUsername)).to.throw(/Username must be at least 4 symbols and all should be valid/);
        });

        it('validateUsername should throw when Username contain invalid symbols is provided', () => {
            expect(() => validator.validateUsername(inValidUsername + '@$')).to.throw(/Username must be at least 4 symbols and all should be valid/);
        });
    });

    describe('Password validation tests', () => {
        it('validatePassword should not throw when valid Password is provided', () => {
            expect(() => validator.validatePassword(validPassword)).to.not.throw();
        });
        
        it('validatePassword should throw when short Password is provided', () => {
            expect(() => validator.validatePassword(inValidPassword)).to.throw(/Password has to be Minimum 4 characters at least 1 Alphabet and 1 Number/);
        });

        it('validatePassword should throw when Password with invalid symbols is provided', () => {
            expect(() => validator.validatePassword(inValidPassword + '1@')).to.throw(/Password has to be Minimum 4 characters at least 1 Alphabet and 1 Number/);
        });
    });
});