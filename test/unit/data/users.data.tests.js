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
        const user = {
            'username': 'gosho',
            'password': 1234,
            'repeat-password': 1234,
        };

        const instance = {
            'username': 'gosho',
        };

        const insert = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            return user;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            UsersData.__set__('initUser', newUserMock);
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
        const user = {
            'username': 'gosho',
            'password': 1234,
            'repeat-password': 1234,
        };

        const instance = {
            'username': 'gosho',
            'passHash': '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy',
        };

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

            // sinon.stub(data, '_generateHash').callsFake(() => {
            //     return Promise.resolve();
            // });

            UsersData.__set__('initUser', newUserMock);
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

    describe('users.data update(model)', () => {
        const user = {
            'username': 'gosho',
            'password': 1234,
            'repeat-password': 1234,
        };

        const instance = {
            'username': 'gosho',
            'passHash': '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy',
        };
        const update = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            return instance;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { update };
            });

            // sinon.stub(data, '_generateHash').callsFake(() => {
            //     return Promise.resolve();
            // });

            UsersData.__set__('initUser', newUserMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return instance', () => {
            return data.update(user)
                .then((model) => {
                    expect(model).to.deep.equal(instance);
                });
        });
    });

    describe('users.data update(model)', () => {
        const user = {
            'username': 'gosho',
            'password': 1234,
            'repeat-password': 1234,
        };

        const instance = {
            'username': 'gosho',
            'passHash': '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy',
        };

        const update = () => {
            return Promise.resolve(instance);
        };

        const newUserMock = () => {
            throw new Error('error');
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { update };
            });

            // sinon.stub(data, '_generateHash').callsFake(() => {
            //     return Promise.resolve();
            // });

            UsersData.__set__('initUser', newUserMock);
            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to reject when user cretation return error', () => {
            return expect(data.update(user))
                .to.be.rejectedWith('error');
        });
    });

    describe('users.data _generateHash(user)', () => {
        const user = {
            'password': 1234,
            'repeat-password': 1234,
        };

        const expected = {
            'passHash': '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy',
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return Promise.resolve();
            });

            data = new UsersData(db);
        });

        it('expect to return correct user with calculated hash', () => {
            return data._generateHash(user).should.eventually.equal(expected);
        });
    });
});
