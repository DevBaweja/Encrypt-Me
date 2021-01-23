const additionalCipher = require('./src/additional-cipher');
const multiplicationCipher = require('./src/multiplication-cipher');
const affineCipher = require('./src/affine-cipher');
const monoalphabeticCipher = require('./src/monoalphabetic-cipher');
const autokeyCipher = require('./src/autokey-cipher');
const playfairCipher = require('./src/playfair-cipher');

module.exports = {
    additionalCipher,
    multiplicationCipher,
    affineCipher,
    monoalphabeticCipher,
    autokeyCipher,
    playfairCipher,
};
