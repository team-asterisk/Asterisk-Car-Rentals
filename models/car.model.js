const validator = require('../utils').validator;
const size = require('../utils').constants.size;
const convert = require('../utils/inputConverter').convert;

class Car {
    constructor(model, photoLink) {
        this._makemodel = model.makemodel;
        this._category = model.category;
        this._carphotolink = photoLink;
        this._adultscount = model.adultscount;
        this._bagscount = model.bagscount;
        this._doorscount = model.doorscount;
        this._fueltype = model.fueltype;
        this._transmission = model.transmission;
        this._mileage = model.mileage;
        this._yearofmanufacture = model.yearofmanufacture;
        this._airconditioner = model.airconditioner;
        this._baseprice = model.baseprice;
        this._specialprice = model.specialprice;
        this._specialpriceactivated = model.specialpriceactivated;
        this.comments = [];
        this.booked = [];
    }

    get id() {
        return this._id;
    }

    get _makemodel() {
        return this.makemodel;
    }

    set _makemodel(value) {
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this.makemodel = name;
        } else {
            throw new Error('Invalid car make and model');
        }
    }

    get _category() {
        return this.category;
    }

    set _category(value) {
        const name = convert(value);
        if (validator.validateString(name, size.MIN_NAME, size.MAX_NAME)) {
            this.category = name;
        } else {
            throw new Error('Invalid category name');
        }
    }

    get _carphotolink() {
        return this.carphotolink;
    }

    set _carphotolink(value) {
        const link = convert(value).replace(/&#x2F;/g, '/');
        if (validator.validateImageExtension(link)) {
            this.carphotolink = link;
        } else {
            throw new Error('Invalid photo link - only jpg or png');
        }
    }

    get _adultscount() {
        return this.adultscount;
    }

    set _adultscount(value) {
        const count = parseInt(value, 10);
        if (Number.isNaN(Number(count)) || (count < 2 || count > 20)) {
            throw new Error('Invalid adultscount - must be in range 2-20');
        }

        this.adultscount = count;
    }

    get _bagscount() {
        return this.bagscount;
    }

    set _bagscount(value) {
        const count = parseInt(value, 10);
        if (Number.isNaN(Number(count)) || (count < 2 || count > 20)) {
            throw new Error('Invalid bagscount - must be in range 2-20');
        }

        this.bagscount = count;
    }

    get _doorscount() {
        return this.doorscount;
    }

    set _doorscount(value) {
        const count = parseInt(value, 10);
        if (Number.isNaN(Number(count)) || (count < 2 || count > 5)) {
            throw new Error('Invalid doorscount - must be in range 2-5');
        }

        this.doorscount = count;
    }

    get _fueltype() {
        return this.fueltype;
    }

    set _fueltype(value) {
        const fuelType = convert(value);
        if (validator.validateString(fuelType, size.MIN_NAME, size.MAX_NAME)) {
            this.fueltype = fuelType;
        } else {
            throw new Error('Invalid fuel type name');
        }
    }

    get _transmission() {
        return this.transmission;
    }

    set _transmission(value) {
        const transmissionType = convert(value);
        if (validator.validateString(transmissionType, size.MIN_NAME, size.MAX_NAME)) {
            this.transmission = transmissionType;
        } else {
            throw new Error('Invalid transmission type');
        }
    }

    get _mileage() {
        return this.mileage;
    }

    set _mileage(value) {
        const mpg = parseInt(value, 10);
        if (Number.isNaN(Number(mpg)) || (mpg < 1 || mpg > 200)) {
            throw new Error('Invalid mileage - must be in range 1-200');
        }

        this.mileage = mpg;
    }

    get _yearofmanufacture() {
        return this.yearofmanufacture;
    }

    set _yearofmanufacture(value) {
        const year = parseInt(value, 10);
        if (Number.isNaN(Number(year)) || (year < 2010 || year > 2020)) {
            throw new Error('Invalid year of manufacture - must be in range 2010-2020');
        }

        this.yearofmanufacture = year;
    }

    get _airconditioner() {
        return this.airconditioner;
    }

    set _airconditioner(value) {
        if (typeof value === 'undefined') {
            value = 0;
        }

        if (value < 0 || value > 1) {
            throw new Error('Invalid feature air conditioner');
        }

        this.airconditioner = value;
    }

    get _baseprice() {
        return this.baseprice;
    }

    set _baseprice(value) {
        const price = parseFloat(value, 10);
        if (Number.isNaN(Number(price)) || (price < 0 || price > 2000)) {
            throw new Error('Invalid base price - must be in range 0-2000');
        }

        this.baseprice = price;
    }

    get _specialprice() {
        return this.specialprice;
    }

    set _specialprice(value) {
        const price = parseFloat(value, 10);
        if (Number.isNaN(Number(price)) || (price < 0 || price > 2000)) {
            throw new Error('Invalid special price - must be in range 0-2000');
        }

        this.specialprice = price;
    }

    get _specialpriceactivated() {
        return this.specialpriceactivated;
    }

    set _specialpriceactivated(value) {
        if (typeof value === 'undefined') {
            value = 0;
        }

        if (value < 0 || value > 1) {
            throw new Error('Invalid feature air conditioner');
        }

        this.specialpriceactivated = value;
    }
}


const initCar = (model, photoLink) => {
    return new Car(model, photoLink);
};

module.exports = { Car, initCar };
