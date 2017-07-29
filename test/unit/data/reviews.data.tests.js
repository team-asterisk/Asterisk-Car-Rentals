const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const ReviewsData = rewire('../../../data/models.data/reviews.data');

describe('when there are items in db', () => {
    // base.data parameters
    const db = { collection: () => {} };
    let data = null;

    describe('Base Data create(model)', () => {
        const review = {};
        const user = {};
        const instance = { one: 1, two: 2, three: 3 };
        const insert = () => {
            return Promise.resolve(instance);
        };

        const newReviewMock = () => {
            return instance;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            ReviewsData.__set__('initReview', newReviewMock);
            data = new ReviewsData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return model', () => {
            return data.create(review, user)
                .then((models) => {
                    expect(models).to.deep.equal(instance);
                });
        });
    });
});
