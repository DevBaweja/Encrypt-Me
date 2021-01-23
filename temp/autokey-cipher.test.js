const { testString, randomString } = require('../util/base.util');
const { encrypt, decrypt, isValidKey, getValidKey } = require('../src/autokey-cipher');

const test = testString();
const random = randomString();

const argv = process.argv[process.argv.length - 1];
const size = 5;
const key = getValidKey(size);
switch (argv) {
    case '--test':
        {
            console.log('----TEST----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            console.log(`PT: ${decrypt(encrypt(test, key), key)}`);
        }
        break;

    case '--random':
        {
            console.log('----RANDOM----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${random}`);
            console.log(`CT: ${encrypt(random, key)}`);
            console.log(`PT: ${decrypt(encrypt(random, key), key)}`);
        }
        break;
    case '--isValidKey':
        {
            console.log('----Is Valid Key----');
            console.log(`Key: ${key} is ${isValidKey(key) ? 'valid' : 'invalid'}`);
        }
        break;
    case '--validKey':
        {
            console.log('----Valid Key----');
            let key = getValidKey(size);
            console.log(`Key ${key} is valid key.`);
        }
        break;
    default: {
        console.log('Invalid Argument!');
        process.exit(-1);
    }
}
