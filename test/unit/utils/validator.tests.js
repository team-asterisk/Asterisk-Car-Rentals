const expect = require('chai').expect;
const sinon = require('sinon');

const validator = require('../../../utils/validator');

describe('Validation tests', () => {
    const emptyString = '';
    const shortString = 'ds';
    const longString = 'dsdsdsdsdsds';
    const name = 'Dan4o';
    const image = 'image.png';
    const invalidImage = 'image.svg';
    const validEmail = 'proba@proba.com';
    const inValidEmail = '@proba@proba.com';
    const validPhone = '0898998877';
    const inValidPhone = '230-34_23';
    const validUrl = 'http://www.telerik.com';
    const inValidUrl = 'http:/sdfsf.gfdff';
    const validPassword = 'dandan13';
    const inValidPassword = 'da'; // Valid Password must be at least 3 symbols

    describe('String validation tests', () => {
        it('validateString should not throw when valid non empty string is provided', () => {
            expect(() => validator.validateString(name, 2, 100).to.not.throw());
        });

        it('validateString should throw when empty string is provided', () => {
            expect(() => validator.validateString(emptyString, 2, 100)).to.throw(/Invalid text/);
        });

        it('validateString should throw when the string provided is shorter than allowed', () => {
            expect(() => validator.validateString(shortString, 3, 10)).to.throw(/Invalid text/);
        });

        it('validateString should throw when the string provided is longer than allowed', () => {
            expect(() => validator.validateString(longString, 3, 10)).to.throw(/Invalid text/);
        });
    });

    describe('Image extension validation tests', () => {
        it('validateImageExtension should not throw when valid image is provided', () => {
            expect(() => validator.validateImageExtension(image)).to.not.throw();
        });

        it('validateImageExtension should throw when the image provided has different than expected Extension', () => {
            expect(() => validator.validateImageExtension(invalidImage)).to.throw(/Invalid image/);
        });
    });

    describe('Email validation tests', () => {
        it('validateEmail should not throw when valid Email is provided', () => {
            expect(() => validator.validateEmail(validEmail)).to.not.throw();
        });
        
        it('validateEmail should throw when invalid Email is provided', () => {
            expect(() => validator.validateEmail(inValidEmail)).to.throw(/Invalid email/);
        });
    });

    describe('Phone validation tests', () => {
        it('validatePhone should not throw when valid Phone is provided', () => {
            expect(() => validator.validatePhone(validPhone)).to.not.throw();
        });
        
        it('validatePhone should throw when invalid Phone is provided', () => {
            expect(() => validator.validatePhone(inValidPhone)).to.throw(/Invalid phone/);
        });
    });

    describe('Password validation tests', () => {
        it('validatePassword should not throw when valid Password is provided', () => {
            expect(() => validator.validatePassword(validPassword)).to.not.throw();
        });

        it('validatePassword should throw when invalid Password is provided', () => {
            expect(() => validator.validatePassword(inValidPassword)).to.throw(/Invalid password/);
        });
    });

    describe('Url validation tests', () => {
        it('validateUrl should not throw when valid Url is provided', () => {
            expect(() => validator.validateUrl(validUrl)).to.not.throw();
        });

        it('validateUrl should throw when invalid Url is provided', () => {
            expect(() => validator.validateUrl(inValidUrl)).to.throw(/Invalid url/);
        });
    });
});
