const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const generateHash = require('../../../data/models.data/users.hash.generator');

describe('when correct user provided', () => {
    describe('users.hash.generator(user)', () => {
        let user = {};

        beforeEach(() => {
            user = {
                'password': '1234',
                'repeat-password': '1234',
            };
        });

        it('expect to return correct user with calculated hash', () => {
            return generateHash(user)
                .then((newUser) => {
                    expect(newUser).have.property('passHash');
                });
        });

        it('expect to return correct hash length', () => {
            return generateHash(user)
                .then((newUser) => {
                    expect(newUser.passHash).to.have.length(60);
                });
        });
    });
});
