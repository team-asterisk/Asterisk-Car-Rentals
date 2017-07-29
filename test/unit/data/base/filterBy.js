const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Base Data filterBy(props)', () => {
    const db = { collection: () => {} };
    let ModelClass = null;
    let data = null;

    let items = [];
    const filterProps = {};
    const toArray = () => {
        return Promise.resolve(items);
    };
    const find = () => {
        return { toArray };
    };

    describe('when there are items in db', () => {
        beforeEach(() => {
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
});
