const { testString, randomString, specialString } = require('../util/base.util');
const {
    encrypt,
    decrypt,
    attack,
    getAllValidKeys,
    isValidKey,
    getValidKey,
    getInvKey,
} = require('../src/affine-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const argv = process.argv[process.argv.length - 1];
const key = getValidKey();
switch (argv) {
    case '--test':
        {
            console.log('----TEST----');
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} `);
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            console.log(`PT: ${decrypt(encrypt(test, key), key)}`);
        }
        break;
    case '--random':
        {
            console.log('----RANDOM----');
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} `);
            console.log(`PT: ${random}`);
            console.log(`CT: ${encrypt(random, key)}`);
            console.log(`PT: ${decrypt(encrypt(random, key), key)}`);
        }
        break;
    case '--special':
        {
            console.log('----SPECIAL----');
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} `);
            console.log(`PT: ${special}`);
            console.log(`CT: ${encrypt(special, key)}`);
            console.log(`PT: ${decrypt(encrypt(special, key), key)}`);
        }
        break;
    case '--attack':
        {
            console.log('----ATTACK----');
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} `);
            console.log(`PT: ${test}`);
            console.log(`CT: ${encrypt(test, key)}`);
            const [validPlains, validKeys] = attack(encrypt(test, key));
            validKeys.forEach((key, index) => {
                console.log(`Valid PT - ${validPlains[index]}, Valid Key - kadd: ${key.kadd}, kmul: ${key.kmul} `);
            });
        }
        break;
    case '--allValidKeys':
        {
            console.log('----All Valid Keys----');
            const valid = getAllValidKeys();
            valid.forEach(item => {
                console.log(`Key - kadd: ${item.kadd}, kmul: ${item.kmul} `);
            });
        }
        break;
    case '--isValidKey':
        {
            console.log('----Is Valid Key----');
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} is ${isValidKey(key) ? 'valid' : 'invalid'}`);
        }
        break;
    case '--validKey':
        {
            console.log('----Valid Key----');
            let key = getValidKey();
            console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} is valid key.`);
        }
        break;
    case '--invKey':
        {
            console.log('---- Inverted Key ---- ');
            const invKey = getInvKey(key);
            if (invKey !== -1)
                console.log(
                    `Key - kadd: ${key.kadd}, kmul: ${key.kmul}, Inverted Key - kadd: ${invKey.kadd}, kmul: ${invKey.kmul}`
                );
            else console.log(`Key - kadd: ${key.kadd}, kmul: ${key.kmul} is not an inverted key.`);
        }
        break;
    default: {
        console.log('Invalid Argument!');
        process.exit(-1);
    }
}
