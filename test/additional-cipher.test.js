const { testString, randomString, specialString } = require('../util/base.util');
const { encrypt, decrypt, attack, getAllValidKeys, isValidKey, getValidKey } = require('../src/additional-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const key = getValidKey();

describe('Encrypt Decrypt', () => {
    it('test', () => {
        expect(test).toEqual(decrypt(encrypt(test, key), key));
    });
    it('random', () => {
        expect(random).toEqual(decrypt(encrypt(random, key), key));
    });
    it('special', () => {
        expect(special).toEqual(decrypt(encrypt(special, key), key));
    });
});
