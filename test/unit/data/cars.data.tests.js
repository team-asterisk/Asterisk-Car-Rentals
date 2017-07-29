const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const rewire = require('rewire');
const CarsData = rewire('../../../data/models.data/cars.data');

describe('when there are items in db', () => {
    // base.data parameters
    const db = { collection: () => {} };
    let data = null;

    describe('cars.data findByBookingId(id)', () => {
        let items = [];
        const id = '597acb4930c4971364beae60';
        const findOne = () => {
            return Promise.resolve(items);
        };

        beforeEach(() => {
            items = ['item one', 'item two', 'item three'];
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });
            data = new CarsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return items', () => {
            return data.findByBookingId(id)
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
    });

    describe('cars.data create(car, photoLink)', () => {
        const car = {};
        const link = '';
        const instance = { one: 1, two: 2, three: 3 };
        const insert = () => {
            return Promise.resolve(instance);
        };

        const newCarMock = () => {
            return instance;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            CarsData.__set__('initCar', newCarMock);
            data = new CarsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.create(car, link)
                .then((models) => {
                    expect(models).to.deep.equal(instance);
                });
        });
    });

    describe('cars.data create(car, photoLink)', () => {
        const car = {};
        const link = '';
        const instance = { one: 1, two: 2, three: 3 };
        const insert = () => {
            return Promise.resolve(instance);
        };

        const newCarMock = () => {
            throw new Error('error');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            CarsData.__set__('initCar', newCarMock);
            data = new CarsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to reject when car cretation return error', () => {
            return expect(data.create(car, link))
                .to.be.rejectedWith('error');
        });
    });

    describe('cars.data createComment(comment, user, carId)', () => {
        const comment = {};
        const user = {};
        const carId = '597acb4930c4971364beae60';
        const instance = { one: 1, two: 2, three: 3 };
        const update = () => {
            return Promise.resolve(instance);
        };

        const newCommentMock = () => {
            return instance;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { update };
            });

            CarsData.__set__('initComment', newCommentMock);
            data = new CarsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.createComment(comment, user, carId)
                .then((models) => {
                    expect(models).to.deep.equal(instance);
                });
        });
    });

    describe('cars.data createComment(comment, user, carId)', () => {
        const comment = {};
        const user = {};
        const carId = '597acb4930c4971364beae60';
        const instance = { one: 1, two: 2, three: 3 };
        const update = () => {
            return Promise.resolve(instance);
        };

        const newCommentMock = () => {
            throw new Error('error');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { update };
            });

            CarsData.__set__('initComment', newCommentMock);
            data = new CarsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to reject when comment creation return error', () => {
            return expect(data.createComment(comment, user, carId))
                .to.be.rejectedWith('error');
        });
    });
});
