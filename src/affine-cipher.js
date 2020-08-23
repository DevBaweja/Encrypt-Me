const additionalCipher = require('./additional-cipher');
const multiplicationCipher = require('./multiplication-cipher');

// all valid keys: {kadd:[],kmul:[]}
const getAllValidKeys = () => {
    const kadd = additionalCipher.getAllValidKeys();
    const kmul = multiplicationCipher.getAllValidKeys();
    return { kadd, kmul };
};

module.exports = {
    getAllValidKeys,
};
