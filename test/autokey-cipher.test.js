const { testString, randomString, specialString } = require('../util/base.util');
const { encrypt, decrypt, attack, getAllValidKeys, isValidKey, getValidKey } = require('../src/autokey-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const validArgs = ['--test', '--random', '--special', '--attack', '--allValidKeys', '--isValidKey', '--validKey'];
const argv = process.argv[process.argv.length - 1];
if (validArgs.findIndex(arg => arg === argv) === -1) {
    console.log('Invalid Argument!');
    process.exit(-1);
}

const key = getValidKey();
switch (argv) {
    case '--test':
        {
            console.log('----TEST----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${test}`);
            const { newKey, cipher } = encrypt(test, key);
            console.log(`New Key: ${newKey}`);
            console.log(`CT: ${cipher}`);
            console.log(`PT: ${decrypt(cipher, newKey)}`);
        }
        break;

    case '--random':
        {
            console.log('----RANDOM----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${random}`);
            const { newKey, cipher } = encrypt(random, key);
            console.log(`New Key: ${newKey}`);
            console.log(`CT: ${cipher}`);
            console.log(`PT: ${decrypt(cipher, newKey)}`);
        }
        break;
    case '--special':
        {
            console.log('----SPECIAL----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${special}`);
            const { newKey, cipher } = encrypt(special, key);
            console.log(`New Key: ${newKey}`);
            console.log(`CT: ${cipher}`);
            console.log(`PT: ${decrypt(cipher, newKey)}`);
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
    }
}