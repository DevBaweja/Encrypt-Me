const { getAscii, getValue, modulus } = require('../util/base.util.js');

// (plain,key) -> cipher | -1
const encrypt = (plain, key) => {
    // Checking if key is invertible
    const invKey = getInvKey(key);
    if (invKey == -1) return -1;

    let cipher = '';
    const mod = 26;
    const list = plain.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Multiplication Encryption Function
            const newAscii = modulus(ascii * key, mod);
            const value = getValue(newAscii);
            cipher += value;
        } else cipher += item;
    });
    return cipher;
};

// key -> invKey | -1
const getInvKey = key => {
    let invKey = -1;
    const mod = 26;

    // Since all key cann't be inverted
    const validKeys = getAllValidKeys();
    for (let validKey of validKeys) {
        if (modulus(key * validKey, mod) === 1) {
            invKey = validKey;
            break;
        }
    }
    return invKey;
};

// (cipher,key) -> plain | -1
const decrypt = (cipher, key) => {
    // Checking if key is invertible
    const invKey = getInvKey(key);
    if (invKey == -1) return -1;

    let plain = '';
    const mod = 26;
    const list = cipher.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Multiplication Decryption Function
            // Modulus
            const newAscii = modulus(ascii * invKey, mod);

            const value = getValue(newAscii);
            plain += value;
        } else plain += item;
    });
    return plain;
};

// all valid keys: []
const getAllValidKeys = () => {
    const validKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    return validKeys;
};

// any valid key: key
const getValidKey = () => {
    const validKeys = getAllValidKeys();
    const index = Math.floor(validKeys.length * Math.random());
    return validKeys[index];
};

// is valid key: true | false
const isValidKey = key => {
    const validKeys = getAllValidKeys();
    return validKeys.includes(key);
};

// cipher -> all plain with keys : []
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
