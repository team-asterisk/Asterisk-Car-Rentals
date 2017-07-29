const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { validator } = require('../../../utils/validator');
const Review = require('../../../models/review.model').Review;

describe('Review Model tests', () => {
    let validatorTypeOfStub;
    let validatorIfEmptyStringStub;
    let validatorIfUndefinedOrNullStub;
    let validatorEmailStub;
    let validatorPhoneStub;
    let validatorPasswordStub;
    let validatorUsernameStub;
    let validatorIfNumberStub;

    beforeEach(() => {
        validatorTypeOfStub = sinon.stub(validator, 'validateTypeOf');
        validatorIfEmptyStringStub = sinon.stub(validator, 'validateIfEmptyString');
        validatorIfUndefinedOrNullStub = sinon.stub(validator, 'validateIfUndefinedOrNull');
        validatorEmailStub = sinon.stub(validator, 'validateEmail');
        validatorPhoneStub = sinon.stub(validator, 'validatePhone');
        validatorPasswordStub = sinon.stub(validator, 'validatePassword');
        validatorUsernameStub = sinon.stub(validator, 'validateUsername');
        validatorIfNumberStub = sinon.stub(validator, 'validateIfNumber');
    });

    afterEach(() => {
        validatorTypeOfStub.restore();
        validatorIfEmptyStringStub.restore();
        validatorIfUndefinedOrNullStub.restore();
        validatorEmailStub.restore();
        validatorPhoneStub.restore();
        validatorPasswordStub.restore();
        validatorUsernameStub.restore();
        validatorIfNumberStub.restore();
    });

    const expectedAuthor = 'Name';
    const expectedContent = 'nice web app';
    const expectedRating = 5;
    const invalidRating = 6;

    const model = { review: expectedContent, rating: expectedRating };
    const invalidModel = { review: expectedContent, rating: invalidRating };
    const user = { username: expectedAuthor };

    it('Review constructor should throw when invalid rating is provided', () => {
        expect(() => new Review(invalidModel, user).to.throw(/Invalid Rating/));
    });

    it('Expect Review to be created with passed arguments when valid arguments are provided', () => {
        const sut = new Review(model, user);
        expect(sut._author).to.equal(expectedAuthor);
        expect(sut._content).to.equal(expectedContent);
        expect(sut._rating).to.equal(expectedRating);
    });

    it('Expect Review constructor to call validator to check if the passed content is of type string', () => {
        const sut = new Review(model, user);
        expect(validatorTypeOfStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Review constructor to call validator to check if the passed content is empty string', () => {
        const sut = new Review(model, user);
        expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Review constructor to call validator to check if the passed content is undefined or null', () => {
        const sut = new Review(model, user);
        expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Review constructor to call validator to check if the passed author is valid', () => {
        const sut = new Review(model, user);
        expect(validatorUsernameStub).to.have.been.calledWith(expectedAuthor);
    });

    it('Expect Review constructor to call validator to check if the passed rating is valid', () => {
        const sut = new Review(model, user);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedRating);
    });
});
