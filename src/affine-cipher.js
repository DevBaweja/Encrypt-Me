const { getAscii, getValue, modulus } = require('../util/base.util.js');

// (plain, key: { kadd, kmul}) -> cipher | -1
const encrypt = (plain, { kadd, kmul }) => {
    // Checking if key is valid
    if (!isValidKey({ kadd, kmul })) return -1;

    let cipher = '';
    const mod = 26;
    const list = plain.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Affine Encryption Function
            const newAscii = modulus(ascii * kmul + kadd, mod);
            const value = getValue(newAscii);
            cipher += value;
        } else cipher += item;
    });
    return cipher;
};

// key -> invKey | -1
const getInvKey = ({ kadd, kmul }) => {
    if (!isValidKey({ kadd, kmul })) return -1;
    let invKey;
    const mod = 26;

    // Since all key cann't be inverted
    const validKeys = getAllValidKeys();
    for (let validKey of validKeys) {
        if (modulus(validKey.kmul * kmul, mod) === 1 && validKey.kadd === kadd) {
            invKey = validKey;
            return invKey;
        }
    }
};

// (cipher, key: { kadd, kmul}) -> plain | -1
const decrypt = (cipher, { kadd, kmul }) => {
    // Checking if key is valid
    if (!isValidKey({ kadd, kmul })) return -1;

    const invKey = getInvKey({ kadd, kmul });

    let plain = '';
    const mod = 26;
    const list = cipher.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Affine Decryption Function
            const newAscii = modulus((ascii - invKey.kadd) * invKey.kmul, mod);

            const value = getValue(newAscii);
            plain += value;
        } else plain += item;
    });
    return plain;
};

// all valid keys: [ { kadd,kmul } ]
const getAllValidKeys = () => {
    const kaddAll = Array.from(Array(26).keys());
    const kmulAll = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

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

// cipher -> all plain with keys : [plain: [],key: []]
const attack = cipher => {
    const validKeys = getAllValidKeys();
    const validPlains = [];
    validKeys.forEach(key => {
        validPlains.push(decrypt(cipher, key));
    });
    return [validPlains, validKeys];
};

module.exports = {
    encrypt,
    decrypt,
    attack,
    getAllValidKeys,
    isValidKey,
    getValidKey,
    getInvKey,
};
