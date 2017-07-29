const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { validator } = require('../../../utils/validator');
const User = require('../../../models/user.model').User;

describe('User Model tests', () => {
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

    const expectedName = 'Name';
    const expectedUsername = 'username';
    const expectedPassword = 'password1';
    const expectedPhone = '0955444434';
    const expectedEmail = 'dan@dan.bg';

    const model = {};

    model.name = expectedName;
    model.username = expectedUsername;
    model.password = expectedPassword;
    model.phone = expectedPhone;
    model.email = expectedEmail;
    model.role = 'user';
    model.bookings = [];

    it('Expect User to be created with passed arguments when valid arguments are provided', () => {
        const sut = new User(model);
        expect(sut._name).to.equal(expectedName);
        expect(sut._username).to.equal(expectedUsername);
        expect(sut._password).to.equal(expectedPassword);
        expect(sut._phone).to.equal(expectedPhone);
        expect(sut._email).to.equal(expectedEmail);
        expect(sut._role).to.equal('user');
        expect(sut._bookings.length).to.equal(0);
    });

    it('Expect User constructor to call validator to check if the passed name is of type string', () => {
        const sut = new User(model);
        expect(validatorTypeOfStub).to.have.been.calledWith(expectedName);
    });

    it('Expect User constructor to call validator to check if the passed name is empty string', () => {
        const sut = new User(model);
        expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedName);
    });

    it('Expect User constructor to call validator to check if the passed name is undefined or null', () => {
        const sut = new User(model);
        expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedName);
    });

    it('Expect User constructor to call validator to check if the passed email is valid', () => {
        const sut = new User(model);
        expect(validatorEmailStub).to.have.been.calledWith(expectedEmail);
    });

    it('Expect User constructor to call validator to check if the passed phone is valid', () => {
        const sut = new User(model);
        expect(validatorPhoneStub).to.have.been.calledWith(expectedPhone);
    });

    it('Expect User constructor to call validator to check if the passed password is valid', () => {
        const sut = new User(model);
        expect(validatorPasswordStub).to.have.been.calledWith(expectedPassword);
    });

    it('Expect User constructor to call validator to check if the passed username is valid', () => {
        const sut = new User(model);
        expect(validatorUsernameStub).to.have.been.calledWith(expectedUsername);
    });
});
