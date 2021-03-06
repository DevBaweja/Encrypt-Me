const { testString, randomString, specialString } = require('../util/base.util');
const { encrypt, decrypt, isValidKey, getValidKey, getInvKey } = require('../src/monoalphabetic-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const argv = process.argv[process.argv.length - 1];
let key = getValidKey();
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
    case '--special':
        {
            console.log('----SPECIAL----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${special}`);
            console.log(`CT: ${encrypt(special, key)}`);
            console.log(`PT: ${decrypt(encrypt(special, key), key)}`);
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
            let key = getValidKey();
            console.log(`Key ${key} is valid key.`);
        }
        break;
    case '--invKey':
        {
            console.log('---- Inverted Key ---- ');
            const invKey = getInvKey(key);
            if (invKey !== -1) console.log(`Key: ${key}, Inverted Key: ${invKey}`);
            else console.log(`Key: ${key} is not an inverted key.`);
        }
        break;
    default: {
        console.log('Invalid Argument!');
        process.exit(-1);
    }
}
