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

// key -> invKey, -1
const getInvKey = key => {
    let invKey = -1;
    const mod = 26;

    // Since even key cann't be inverted
    for (let validKey = 1; validKey < 26; validKey += 2) {
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

//
const attack = cipher => {
    const validKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    validKeys.forEach(key => {
        const plain = decrypt(cipher, key);
        // ! For Development
        console.log(`Valid PT: ${plain}, Key : ${key} `);
    });
};
module.exports = {
    encrypt,
    decrypt,
    attack,
};
