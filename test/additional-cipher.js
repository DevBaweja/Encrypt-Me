const { testString, randomString } = require('../util/base.util');
const { encrypt, decrypt } = require('../src/additional-cipher');

const test = testString();
const random = randomString();

console.log('----TEST----');
console.log(test);
console.log(encrypt(test, 2));
console.log(decrypt(encrypt(test, 2), 2));

console.log('----RANDOM----');
console.log(random);
console.log(encrypt(random, 2));
console.log(decrypt(encrypt(random, 2), 2));
