const { testString, randomString } = require('../util/base.util');
const { encrypt, decrypt, attack } = require('../src/multiplication-cipher');

const test = testString();
const random = randomString();

const validArgs = ['--test', '--random', '--attack'];
const argv = process.argv[process.argv.length - 1];
if (validArgs.findIndex(arg => arg === argv) === -1) {
    console.log('Invalid Argument!');
    process.exit(-1);
}

const key = 3;
switch (argv) {
    case '--test':
        {
            console.log('----TEST----');
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            console.log(`PT: ${decrypt(encrypt(test, key), key)}`);
        }
        break;

    case '--random':
        {
            console.log('----RANDOM----');
            console.log(`PT: ${random}`);
            console.log(`CT: ${encrypt(random, key)}`);
            console.log(`PT: ${decrypt(encrypt(random, key), key)}`);
        }
        break;
    case '--attack':
        {
            console.log('----ATTACK----');
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            attack(encrypt(test, key));
        }
        break;
    default: {
    }
}
