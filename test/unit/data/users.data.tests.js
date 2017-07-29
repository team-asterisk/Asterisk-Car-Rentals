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

        it('expect to return user', () => {
            return data.findByUsername(username)
                .then((models) => {
                    expect(models).to.deep.equal(expected);
                });
        });
    });

    describe('users.data create(model)', () => {
        const user = {};
        const instance = {};

        const insert = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            return user;
        };

        const hashGenMock = () => {
            return Promise.resolve('hash');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            UsersData.__set__('initUser', newUserMock);
            UsersData.__set__('generateHash', hashGenMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.create(user)
                .then((model) => {
                    expect(model).to.deep.equal(instance);
                });
        });
    });

    describe('users.data create(model)', () => {
        const user = {};
        const instance = {};

        const insert = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            throw new Error('error');
        };

        const hashGenMock = () => {
            return Promise.resolve('hash');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            UsersData.__set__('initUser', newUserMock);
            UsersData.__set__('generateHash', hashGenMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to reject when user cretation return error', () => {
            return expect(data.create(user))
                .to.be.rejectedWith('error');
        });
    });

    describe('users.data updateUser(model)', () => {
        const user = {};
        const instance = {};

        const updateOne = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            return user;
        };

        const hashGenMock = () => {
            return Promise.resolve('hash');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });

            UsersData.__set__('initUser', newUserMock);
            UsersData.__set__('generateHash', hashGenMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.updateUser(user)
                .then((model) => {
                    expect(model).to.deep.equal(instance);
                });
        });
    });

    describe('users.data update(model)', () => {
        const user = {};
        const instance = {};

        const updateOne = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            throw new Error('error');
        };

        const hashGenMock = () => {
            return Promise.resolve('hash');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });

            UsersData.__set__('initUser', newUserMock);
            UsersData.__set__('generateHash', hashGenMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });
        it('expect to reject when user cretation return error', () => {
            return expect(data.updateUser({}, user))
                .to.be.rejectedWith('error');
        });
    });
});
