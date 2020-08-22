// 'a' -> 0 , ' ' -> -1
const getAscii = item => {
    let ascii = item.charCodeAt();
    ascii = ascii - 97;
    if (ascii >= 0 && ascii <= 25) return ascii;
    return -1;
};

// 0 -> 'a'
const getValue = ascii => {
    const newAscii = ascii + 97;
    const value = String.fromCharCode(newAscii);
    return value;
};

// value % mod
const modulus = (value, mod) => value % mod;

// Random b/w [min,max]
const random = (min = 0, max = 26) => Math.floor(Math.random() * (max - min) + min);

// 'abcd ... wxyz'
const testString = () => 'abcd efgh ijklmn opqr stuv wxyz';

const specialString = () => '1!2@3#4$:.;';

// Random seq of chars
const randomString = (len = 26) => {
    let string = '';
    for (let i = 0; i < len; i++) {
        const value = getValue(random());
        string += value;
    }
    return string;
};

module.exports = {
    getAscii,
    getValue,
    modulus,
    random,
    testString,
    randomString,
    specialString,
};
