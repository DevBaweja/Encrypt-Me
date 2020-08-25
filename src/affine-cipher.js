const { getAscii, getValue, modulus } = require('../util/base.util.js');
const additionalCipher = require('./additional-cipher');
const multiplicationCipher = require('./multiplication-cipher');

// key -> invKey | -1
const getInvKey = key => {
    if (!isValidKey(key)) return -1;
    let invKey;
    const mod = 26;

    // Since all key cann't be inverted
    const validKeys = getAllValidKeys();
    for (let validKey of validKeys) {
        if (modulus(key.kmul * validKey.kmul, mod) === 1 && key.kadd === validKey.kadd) {
            invKey = validKey;
            return invKey;
        }
    }
};

// all valid keys: [ { kadd,kmul } ]
const getAllValidKeys = () => {
    const kaddAll = additionalCipher.getAllValidKeys();
    const kmulAll = multiplicationCipher.getAllValidKeys();

    const valid = [];
    kaddAll.forEach(kadd => {
        kmulAll.forEach(kmul => {
            valid.push({ kadd, kmul });
        });
    });
    return valid;
};

// { kadd, kmul } -> true | false
const isValidKey = ({ kadd, kmul }) => {
    const validKeys = getAllValidKeys();
    return !!validKeys.find(key => key.kadd === kadd && key.kmul === kmul);
};

// any valid key: { kadd, kmul }
const getValidKey = () => {
    const validKeys = getAllValidKeys();
    const index = Math.floor(validKeys.length * Math.random());
    return validKeys[index];
};

module.exports = {
    getAllValidKeys,
    isValidKey,
    getValidKey,
    getInvKey,
};
