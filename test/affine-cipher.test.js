const { testString, randomString, specialString } = require('../util/base.util');
const { getAllValidKeys } = require('../src/affine-cipher');

const test = testString();
const random = randomString();
const special = specialString();

const validArgs = ['--allValidKeys'];
const argv = process.argv[process.argv.length - 1];
if (validArgs.findIndex(arg => arg === argv) === -1) {
    console.log('Invalid Argument!');
    process.exit(-1);
}

// const key = getValidKey();
switch (argv) {
    case '--allValidKeys':
        {
            console.log('----All Valid Keys----');
            const validKeys = getAllValidKeys();
            console.log(validKeys.kadd);
        }
        break;
}
