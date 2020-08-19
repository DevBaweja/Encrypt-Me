const { getAscii, getValue, modulus } = require('../util/base.util.js');

const encrypt = (plain, key) => {
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

const decrypt = (cipher, key) => {
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

module.exports = {
    encrypt,
    decrypt,
};
