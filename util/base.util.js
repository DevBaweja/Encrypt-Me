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
const modulus = (value, mod) => {
    let newValue = value % mod;
    if (newValue < 0) newValue = newValue + mod;
    return newValue;
};

// Random b/w [min,max]
const random = (min = 0, max = 26) => Math.floor(Math.random() * (max - min) + min);

// 'abcd ... wxyz'
const testString = () => 'abcd efgh ijklmn opqr stuv wxyz';

const alphabets = () => 'abcdefghijklmnopqrstuvwxyz';

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

// [1,2,3,4] -> [4,1,2,3]
const circularShiftRight = (array, times = 1) => {
    const newArray = [...array];
    while (times > 0) {
        newArray.unshift(newArray.pop());
        times--;
    }
    return newArray;
};

// [1,2,3,4] -> [2,3,4,1]
const circularShiftLeft = (array, times = 1) => {
    const newArray = [...array];
    while (times > 0) {
        newArray.push(newArray.shift());
        times--;
    }
    return newArray;
};

module.exports = {
    getAscii,
    getValue,
    modulus,
    random,
    testString,
    alphabets,
    randomString,
    specialString,
    circularShiftRight,
    circularShiftLeft,
};
