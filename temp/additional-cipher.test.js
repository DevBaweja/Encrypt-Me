const { testString, randomString, specialString } = require('../util/base.util');
const { encrypt, decrypt, attack, getAllValidKeys, isValidKey, getValidKey } = require('../src/additional-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const argv = process.argv[process.argv.length - 1];
const key = getValidKey();
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
    case '--attack':
        {
            console.log('----ATTACK----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            const valid = attack(encrypt(test, key));
            valid.forEach(item => {
                console.log(`Valid PT: ${item.plain}, Valid Key : ${item.key} `);
            });
        }
        break;
    case '--allValidKeys':
        {
            console.log('----All Valid Keys----');
            const validKeys = getAllValidKeys();
            validKeys.forEach(key => {
                console.log(`Key: ${key}`);
            });
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
    default: {
        console.log('Invalid Argument!');
        process.exit(-1);
    }
}
