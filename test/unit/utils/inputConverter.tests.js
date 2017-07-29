const expect = require('chai').expect;

const converter = require('../../../utils/inputConverter');

describe('Input Converter tests', () => {
    const stringWithSlash = 'some/thing';
    const stringWithApostrophe = 'some\'thing';
    const stringWithQuote = 'some"thing';
    const stringWithLessThan = 'some<thing';
    const stringWithGreaterThan = 'some>thing';
    const stringWithAmpersand = 'some&thing';
    const expectedString = 'something';

    it('Should return escaped string without slash', () => {
        expect(() => converter(stringWithSlash).to.equal(expectedString));
    });

    it('Should return escaped string without Apostrophe', () => {
        expect(() => converter(stringWithApostrophe).to.equal(expectedString));
    });

    it('Should return escaped string without Quote', () => {
        expect(() => converter(stringWithQuote).to.equal(expectedString));
    });

    it('Should return escaped string without Less than sign', () => {
        expect(() => converter(stringWithLessThan).to.equal(expectedString));
    });

    it('Should return escaped string without Greater than sign', () => {
        expect(() => converter(stringWithGreaterThan).to.equal(expectedString));
    });

    it('Should return escaped string without Ampersand', () => {
        expect(() => converter(stringWithAmpersand).to.equal(expectedString));
    });
});
