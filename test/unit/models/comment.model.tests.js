const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { validator } = require('../../../utils/validator');
const Comment = require('../../../models/comment.model').Comment;

describe('Comment Model tests', () => {
    let validatorTypeOfStub;
    let validatorIfEmptyStringStub;
    let validatorIfUndefinedOrNullStub;
    let validatorUsernameStub;

    beforeEach(() => {
        validatorTypeOfStub = sinon.stub(validator, 'validateTypeOf');
        validatorIfEmptyStringStub = sinon.stub(validator, 'validateIfEmptyString');
        validatorIfUndefinedOrNullStub = sinon.stub(validator, 'validateIfUndefinedOrNull');
        validatorUsernameStub = sinon.stub(validator, 'validateUsername');
    });

    afterEach(() => {
        validatorTypeOfStub.restore();
        validatorIfEmptyStringStub.restore();
        validatorIfUndefinedOrNullStub.restore();
        validatorUsernameStub.restore();
    });

    const expectedAuthor = 'Name';
    const expectedContent = 'nice web app';

    const model = { comment: expectedContent };
    const user = { username: expectedAuthor };

    it('Expect Comment to be created with passed arguments when valid arguments are provided', () => {
        const sut = new Comment(model, user);
        expect(sut._author).to.equal(expectedAuthor);
        expect(sut._content).to.equal(expectedContent);
    });

    it('Expect Comment constructor to call validator to check if the passed content is of type string', () => {
        const sut = new Comment(model, user);
        expect(validatorTypeOfStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Comment constructor to call validator to check if the passed content is empty string', () => {
        const sut = new Comment(model, user);
        expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Comment constructor to call validator to check if the passed content is undefined or null', () => {
        const sut = new Comment(model, user);
        expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedContent);
    });

    it('Expect Comment constructor to call validator to check if the passed author is valid', () => {
        const sut = new Comment(model, user);
        expect(validatorUsernameStub).to.have.been.calledWith(expectedAuthor);
    });
});
