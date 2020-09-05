const { getAscii, getValue, modulus, alphabets, circularShiftLeft } = require('../util/base.util.js');

// (plain,key) -> cipher | -1
const encrypt = (plain, key) => {
    // if (!isValidKey(key)) return -1;

    const newKey = key + plain.slice(0, -key.length);
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
    return cipher;
};

// (cipher,key) -> plain | -1
const decrypt = (cipher, key) => {
    let plain = '';
    const mod = 26;
    const list = cipher.split('');

    list.forEach((item, index) => {
        const ascii = getAscii(item);
        // [0-25] , -1
        const keyAscii = getAscii(key[index]);

        if (ascii !== -1) {
            // AutoKey Decryption Function
            const newAscii = modulus(ascii - keyAscii, mod);
            const value = getValue(newAscii);
            plain += value;
            // Autokey generation
            key += value;
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

// plain, key -> cipher (Tabula Recta)
const getCipherFromTabula = (plain, key) => {
    return generateTabulaRecta()[plain][key];
};

// is valid key: true | false
const isValidKey = key => {
    const keyList = key.split('');
    let isValidKey = true;
    for (const item of keyList) {
        isValidKey = alphabets().split('').includes(item);
        if (!isValidKey) return false;
    }
    return isValidKey;
};

// any valid key: key
const getValidKey = size => {
    const keyList = alphabets().split('');
    let validKey = '';
    while (size > 0) {
        const index = Math.floor(Math.random() * keyList.length);
        validKey += keyList[index];
        size--;
    }
    return validKey;
};

module.exports = {
    encrypt,
    decrypt,
    isValidKey,
    getValidKey,
    generateTabulaRecta,
    getCipherFromTabula,
};
