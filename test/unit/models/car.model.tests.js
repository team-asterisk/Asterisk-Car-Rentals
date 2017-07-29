const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { validator } = require('../../../utils/validator');
const Car = require('../../../models/car.model').Car;

describe('Car Model tests', () => {
    let validatorTypeOfStub;
    let validatorIfEmptyStringStub;
    let validatorIfUndefinedOrNullStub;
    let validatorEmailStub;
    let validatorPhoneStub;
    let validatorPasswordStub;
    let validatorUsernameStub;
    let validatorIfNumberStub;
    let validatorImageExtensionStub;
    let validatorUrlStub;

    beforeEach(() => {
        validatorTypeOfStub = sinon.stub(validator, 'validateTypeOf');
        validatorIfEmptyStringStub = sinon.stub(validator, 'validateIfEmptyString');
        validatorIfUndefinedOrNullStub = sinon.stub(validator, 'validateIfUndefinedOrNull');
        validatorEmailStub = sinon.stub(validator, 'validateEmail');
        validatorPhoneStub = sinon.stub(validator, 'validatePhone');
        validatorPasswordStub = sinon.stub(validator, 'validatePassword');
        validatorUsernameStub = sinon.stub(validator, 'validateUsername');
        validatorIfNumberStub = sinon.stub(validator, 'validateIfNumber');
        validatorImageExtensionStub = sinon.stub(validator, 'validateImageExtension');
        validatorUrlStub = sinon.stub(validator, 'validateUrl');
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
        validatorImageExtensionStub.restore();
        validatorUrlStub.restore();
    });

    const expectedMakemodel = 'Tata';
    const expectedCategory = 'compact';
    const expectedCarphotolink = '/static/photo.png';
    const expectedAdultscount = 2;
    const expectedBagscount = 2;
    const expectedDoorscount = 2;
    const expectedFueltype = 'Petrol';
    const expectedTransmission = 'Manual';
    const expectedMileage = 50;
    const expectedYearofmanufacture = 2011;
    const expectedAirconditioner = 1;
    const expectedBaseprice = 25;
    const expectedSpecialprice = 16;
    const expectedSpecialpriceactivated = 1;

    const model = {};
    model.makemodel = expectedMakemodel;
    model.category = expectedCategory;
    model.adultscount = expectedAdultscount;
    model.bagscount = expectedBagscount;
    model.doorscount = expectedDoorscount;
    model.fueltype = expectedFueltype;
    model.transmission = expectedTransmission;
    model.mileage = expectedMileage;
    model.yearofmanufacture = expectedYearofmanufacture;
    model.airconditioner = expectedAirconditioner;
    model.baseprice = expectedBaseprice;
    model.specialprice = expectedSpecialprice;
    model.specialpriceactivated = expectedSpecialpriceactivated;

    const invalidModel = {};

    it('Expect Car to be created with passed arguments when valid arguments are provided', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(sut._makemodel).to.equal(expectedMakemodel);
        expect(sut._category).to.equal(expectedCategory);
        expect(sut._carphotolink).to.equal(expectedCarphotolink);
        expect(sut._adultscount).to.equal(expectedAdultscount);
        expect(sut._bagscount).to.equal(expectedBagscount);
        expect(sut._doorscount).to.equal(expectedDoorscount);
        expect(sut._fueltype).to.equal(expectedFueltype);
        expect(sut._transmission).to.equal(expectedTransmission);
        expect(sut._mileage).to.equal(expectedMileage);
        expect(sut._yearofmanufacture).to.equal(expectedYearofmanufacture);
        expect(sut._airconditioner).to.equal(expectedAirconditioner);
        expect(sut._baseprice).to.equal(expectedBaseprice);
        expect(sut._specialprice).to.equal(expectedSpecialprice);
        expect(sut._specialpriceactivated).to.equal(expectedSpecialpriceactivated);
    });

    // it('Car constructor should throw when invalid role is provided', () => {
    //     const sut = new Car(model, expectedCarphotolink);
    //     expect(() => (sut._adultscount = 3).to.not.throw(/Invalid adults count/));
    // });

    it('Expect Car constructor to call validator to check if the passed Makemodel is of type string', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(validatorTypeOfStub).to.have.been.calledWith(expectedMakemodel);
    });

    it('Expect Car constructor to call validator to check if the passed Makemodel is empty string', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedMakemodel);
    });

    it('Expect Car constructor to call validator to check if the passed Makemodel is undefined or null', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedMakemodel);
    });

    it('Expect Car constructor to call validator to check if the passed adults count is valid', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedAdultscount);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedBagscount);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedDoorscount);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedAirconditioner);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedBaseprice);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedSpecialprice);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedMileage);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedYearofmanufacture);
        expect(validatorIfNumberStub).to.have.been.calledWith(expectedSpecialpriceactivated);
    });

    it('Expect Car constructor to call validator to check if the passed photo link is valid', () => {
        const sut = new Car(model, expectedCarphotolink);
        expect(validatorImageExtensionStub).to.have.been.calledWith(expectedCarphotolink);
    });
});
