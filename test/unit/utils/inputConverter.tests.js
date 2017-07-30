const expect = require('chai').expect;

const converter = require('../../../utils/inputConverter').convert;

describe('Input Converter tests', () => {
    const stringWithSlash = 'some/thing';
    const escapedStringWithSlash = 'some&#x2F;thing';
    const stringWithApostrophe = 'some\'thing';
    const escapedStringWithApostrophe = 'some&#x27;thing';
    const stringWithQuote = 'some"thing';
    const escapedStringWithQuote = 'some&quot;thing';
    const stringWithLessThan = 'some<thing';
    const escapedStringWithLessThan = 'some&lt;thing';
    const stringWithGreaterThan = 'some>thing';
    const escapedStringWithGreaterThan = 'some&gt;thing';
    const stringWithAmpersand = 'some&thing';
    const escapedStringWithAmpersand = 'some&amp;thing';

    it('Should return escaped string without slash', () => {
        const converted = converter(stringWithSlash);
        expect(converted).to.equal(escapedStringWithSlash);
    });

    it('Should return escaped string without Apostrophe', () => {
        const converted = converter(stringWithApostrophe);
        expect(converted).to.equal(escapedStringWithApostrophe);
    });

    it('Should return escaped string without Quote', () => {
        const converted = converter(stringWithQuote);
        expect(converted).to.equal(escapedStringWithQuote);
    });

    it('Should return escaped string without Less than sign', () => {
        const converted = converter(stringWithLessThan);
        expect(converted).to.equal(escapedStringWithLessThan);
    });

    it('Should return escaped string without Greater than sign', () => {
        const converted = converter(stringWithGreaterThan);
        expect(converted).to.equal(escapedStringWithGreaterThan);
    });

    it('Should return escaped string without Ampersand', () => {
        const converted = converter(stringWithAmpersand);
        expect(converted).to.equal(escapedStringWithAmpersand);
    });
});
