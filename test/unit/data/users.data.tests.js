const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const rewire = require('rewire');
const UsersData = rewire('../../../data/models.data/users.data');

describe('when there are items in db', () => {
    // base.data parameters
    const db = { collection: () => {} };
    let data = null;

    describe('users.data findByUsername(username)', () => {
        const username = 'gosho';
        const users = [
            ['user one'],
            ['user two'],
            ['user three'],
        ];
        const expected = ['user one'];

        beforeEach(() => {
            const User = class {};
            data = new UsersData(db, User);

            sinon.stub(data, 'filterBy').callsFake(() => {
                return Promise.resolve(users);
            });
        });

        it('expect to return array of users', () => {
            return data.findByUsername(username)
                .then((models) => {
                    expect(models).to.deep.equal(expected);
                });
        });
    });

    describe('users.data create(model)', () => {
        const model = {};
        const instance = { one: 1, two: 2, three: 3 };
        const hash = '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy';
        const insert = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            return instance;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            sinon.stub(data, '_generateHash').callsFake(() => {
                return hash;
            });

            UsersData.__set__('initUser', newUserMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.create(model)
                .then((models) => {
                    expect(models).to.deep.equal(instance);
                });
        });
    });

    describe('users.data create(model)', () => {
        const model = {};
        const instance = { one: 1, two: 2, three: 3 };
        const hash = '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy';
        const insert = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            throw new Error('error');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            sinon.stub(data, '_generateHash').callsFake(() => {
                return hash;
            });

            UsersData.__set__('initUser', newUserMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to reject when user cretation return error', () => {
            return expect(data.create(model))
                .to.be.rejectedWith('error');
        });
    });
});
