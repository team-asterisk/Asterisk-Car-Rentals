const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const CarsData = rewire('../../../data/models.data/cars.data');

describe('when there are items in db', () => {
    // base.data parameters
    const db = { collection: () => {} };
    let data = null;

    describe('Cars Data create(model)', () => {
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

        it('expect to return instamce', () => {
            return data.create(car, link)
                .then((models) => {
                    expect(models).to.deep.equal(instance);
                });
        });
    });
});
