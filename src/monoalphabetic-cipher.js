const { getAscii, getValue, alphabets } = require('../util/base.util.js');

// (plain,key) -> cipher | -1
const encrypt = (plain, key) => {
    // Checking if key is valid
    if (!isValidKey(key)) return -1;

    let cipher = '';
    const list = plain.split('');
    const keyList = key.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Monoalphabetic Encryption Function
            const value = keyList[ascii];
            cipher += value;
        } else cipher += item;
    });
    return cipher;
};

// key -> invKey | -1
const getInvKey = key => {
    if (!isValidKey(key)) return -1;
    let invKey = '';

    const list = alphabets().split('');
    const keyList = key.split('');

    list.forEach(item => {
        const ascii = keyList.indexOf(item);
        const value = getValue(ascii);
        invKey += value;
    });
    return invKey;
};

// (cipher,key) -> plain | -1
const decrypt = (cipher, key) => {
    // Checking if key is valid
    if (!isValidKey(key)) return -1;

    const invKey = getInvKey(key);

    let plain = '';
    const list = cipher.split('');
    const invKeyList = invKey.split('');

    list.forEach(item => {
        const ascii = getAscii(item);
        // [0-25] , -1

        if (ascii !== -1) {
            // Multiplication Decryption Function
            const value = invKeyList[ascii];
            plain += value;
        } else plain += item;
    });
    return plain;
};

// is valid key: true | false
const isValidKey = key => {
    const fn = (a, b) => getAscii(a) - getAscii(b);
    const validKey = key.split('').sort(fn).join('');
    return validKey === alphabets();
};

// any valid key: key
const getValidKey = () => {
    const fn = () => Math.random() - 1 / 2;
    const validKey = alphabets().split('').sort(fn).join('');
    return validKey;
};

module.exports = {
    encrypt,
    decrypt,
    isValidKey,
    getValidKey,
    getInvKey,
};
