const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Base Data findById(id)', () => {
    const db = { collection: () => {} };
    let ModelClass = null;
    let data = null;

    let items = [];
    const id = '597acb4930c4971364beae60';
    const findOne = () => {
        return Promise.resolve(items);
    };

    describe('when there are items in db', () => {
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
