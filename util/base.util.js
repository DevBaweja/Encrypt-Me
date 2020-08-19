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

// (28,26) -> 2, (-2,26) -> 24
const modulus = (value, mod) => {
    let newAscii = value % mod;
    if (newAscii < 0) newAscii = newAscii + mod;
    return newAscii;
};

const random = (min = 0, max = 26) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const testString = () => {
    return 'abcd efgh ijklmn opqr stuv wxyz';
};

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
};
