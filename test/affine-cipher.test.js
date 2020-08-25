const { testString, randomString, specialString } = require('../util/base.util');
const { getAllValidKeys, isValidKey, getValidKey, getInvKey } = require('../src/affine-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const validArgs = ['--allValidKeys', '--isValidKey', '--validKey', '--invKey'];
const argv = process.argv[process.argv.length - 1];
if (validArgs.findIndex(arg => arg === argv) === -1) {
    console.log('Invalid Argument!');
    process.exit(-1);
}

const key = getValidKey();
switch (argv) {
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
}
