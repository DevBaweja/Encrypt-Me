const { getAscii, getValue, modulus, alphabets, circularShiftLeft } = require('../util/base.util.js');

// (plain,key) -> cipher | -1
const encrypt = (plain, key) => {
    if (!isValidKey(key)) return -1;

    const newKey = key + plain.slice(0, -1);
    let cipher = '';
    const mod = 26;
    const list = plain.split('');

    list.forEach((item, index) => {
        const ascii = getAscii(item);
        // [0-25] , -1
        const keyAscii = getAscii(newKey[index]);

        if (ascii !== -1) {
            // AutoKey Encryption Function
            const newAscii = modulus(ascii + keyAscii, mod);
            const value = getValue(newAscii);
            cipher += value;
        } else cipher += item;
    });
    return { cipher, newKey };
};

// (cipher,newKey) -> plain | -1
const decrypt = (cipher, newKey) => {
    let plain = '';
    const mod = 26;
    const list = cipher.split('');

    list.forEach((item, index) => {
        const ascii = getAscii(item);
        // [0-25] , -1
        const keyAscii = getAscii(newKey[index]);

        if (ascii !== -1) {
            // AutoKey Decryption Function
            const newAscii = modulus(ascii - keyAscii, mod);
            const value = getValue(newAscii);
            plain += value;
        } else plain += item;
    });
    return plain;
};

// Tabula Recta - [][]
const generateTabulaRecta = () => {
    const tabula = [];
    const mod = 26;
    let index = 0;
    while (index < mod) {
        tabula[index] = circularShiftLeft(alphabets().split(''), index);
        index++;
    }
    return tabula;
};

//
const getCipher = (plain, key) => {
    return generateTabulaRecta()[plain][key];
};

// all valid keys: []
const getAllValidKeys = () => {
    const validKeys = Array.from(Array(26), (_, i) => getValue(i));
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

// cipher -> all plain with keys : [ {plain, keys} ]
const attack = cipher => {
    const validKeys = getAllValidKeys();
    const validPlains = [];
    validKeys.forEach(key => {
        validPlains.push(decrypt(cipher, key));
    });
    // Merging two array into key value pair
    const valid = validKeys.map((key, index) => {
        const plain = validPlains[index];
        return { key, plain };
    });

    return valid;
};

module.exports = {
    encrypt,
    decrypt,
    attack,
    getAllValidKeys,
    isValidKey,
    getValidKey,
};
