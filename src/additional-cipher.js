const { getAscii, getValue, modulus } = require('../util/base.util.js');

// (plain,key) -> cipher | -1
const encrypt = (plain, key) => {
    if (!isValidKey(key)) return -1;

    let cipher = '';
    const mod = 26;
    const list = plain.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Additional Encryption Function
            const newAscii = modulus(ascii + key, mod);
            const value = getValue(newAscii);
            cipher += value;
        } else cipher += item;
    });
    return cipher;
};

// (cipher,key) -> plain | -1
const decrypt = (cipher, key) => {
    if (!isValidKey(key)) return -1;

    let plain = '';
    const mod = 26;
    const list = cipher.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Additional Decryption Function
            // Modulus
            const newAscii = modulus(ascii - key, mod);

            const value = getValue(newAscii);
            plain += value;
        } else plain += item;
    });
    return plain;
};

// all valid keys: []
const getAllValidKeys = () => {
    const validKeys = Array.from(Array(25), (_, i) => i + 1);
    return validKeys;
};

// is valid key: true | false
const isValidKey = key => {
    const validKeys = getAllValidKeys();
    return validKeys.includes(key);
};

// any valid key: key
const getValidKey = () => {
    const validKeys = getAllValidKeys();
    const index = Math.floor(validKeys.length * Math.random());
    return validKeys[index];
};

// cipher -> all plain with keys : [[plain],[key]]
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
};
