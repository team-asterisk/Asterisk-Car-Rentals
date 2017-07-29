const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('when there are items in db', () => {
    const db = { collection: () => {} };
    let ModelClass = null;
    let data = null;

    let items = [];
    const id = '597acb4930c4971364beae60';
    const filterProps = {};
    const toArray = () => {
        return Promise.resolve(items);
    };
    const findOne = () => {
        return Promise.resolve(items);
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
});
