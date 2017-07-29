const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('when there are items in db', () => {
    // base.data parameters
    const db = { collection: () => {} };
    let ModelClass = null;
    let data = null;

    // return values
    let items = [];

    // tested methods parameters
    const id = '597acb4930c4971364beae60';
    let model = {};
    const filterProps = {};

    // chain methods definition
    const toArray = () => {
        return Promise.resolve(items);
    };
    const findOne = () => {
        return Promise.resolve(items);
    };
    const updateOne = () => {
        return Promise.resolve(model);
    };

    describe('Base Data getAll()', () => {
        beforeEach(() => {
            const find = () => {
                return { toArray };
            };
            items = ['item one', 'item two', 'item three'];
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            ModelClass = class Test {};
            data = new BaseData(db, ModelClass);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return items', () => {
            return data.getAll()
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
    });

    describe('Base Data filterBy(props)', () => {
        beforeEach(() => {
            const find = () => {
                return { toArray };
            };
            items = ['item one', 'item two', 'item three'];
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            ModelClass = class Test {};
            data = new BaseData(db, ModelClass);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return items', () => {
            return data.filterBy(filterProps)
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
    });

    describe('Base Data filterBy(props)', () => {
        beforeEach(() => {
            items = ['item one', 'item two', 'item three'];
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });
            ModelClass = class Test {};
            data = new BaseData(db, ModelClass);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return items', () => {
            return data.findById(id)
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
    });

    describe('Base Data updateById(model)', () => {
        beforeEach(() => {
            model = { _id: id, one: 1, two: 2, three: 3 };
            sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });
            ModelClass = class Test {};
            data = new BaseData(db, ModelClass);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return model', () => {
            return data.updateById(model)
                .then((models) => {
                    expect(models).to.deep.equal(model);
                });
        });
    });
});
