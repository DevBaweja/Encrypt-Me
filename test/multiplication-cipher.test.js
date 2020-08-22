const { testString, randomString } = require('../util/base.util');
const {
    encrypt,
    decrypt,
    attack,
    getAllValidKeys,
    isValidKey,
    getValidKey,
    getInvKey,
} = require('../src/multiplication-cipher');

const test = testString();
const random = randomString();

const validArgs = ['--test', '--random', '--attack', '--allValidKeys', '--isValidKey', '--validKey', '--invKey'];
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
    case '--attack':
        {
            console.log('----ATTACK----');
            console.log(`Key: ${key}`);
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            attack(encrypt(test, key));
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
    case '--invKey': {
        console.log('---- Inverted Key ---- ');
        const invKey = getInvKey(key);
        if (invKey !== -1) console.log(`Key: ${key}, Inverted Key: ${invKey}`);
        else console.log(`Key: ${key} is not an inverted key.`);
    }
    default: {
    }
}
