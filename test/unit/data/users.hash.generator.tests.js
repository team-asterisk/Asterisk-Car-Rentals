const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const generateHash = require('../../../data/models.data/users.hash.generator');

describe('when correct user provided', () => {
    describe('users.hash.generator(user)', () => {
        const user = {
            'password': '1234',
            'repeat-password': '1234',
        };

        const expected = {
            'passHash': '$2a$10$c3mgVbBZmwcDBtgmGLTB.uTNCUo3rQBftsuDaQMdXbCgC2jsPzzGy',
        };

        // it('expect to return correct user with calculated hash', () => {
        //     return generateHash(user).should.eventually.equal(expected);
        // });

        it('expect to return correct user with calculated hash', () => {
            return generateHash(user)
                .then((newUser) => {
                    expect(newUser).have.property('passHash');
                    expect(newUser.passHash).to.have.length(60);
                });
        });
    });
});
