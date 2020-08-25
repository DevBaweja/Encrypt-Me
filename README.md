# Encrypt-Me

### Abbr:

```
PT - Plain Text
CT - Cipher Text
Ek - Encryption Function
Dk - Decryption Function
k - Key
```

### Encryption and Decryption

```
CT = Ek(PT)
PT = Dk(CT)
```

# 1. Mono Alphabetic Cipher -

A monoalphabetic cipher is any cipher in which the letters of the plain text are mapped to cipher text letters based on a single alphabetic key.
One to One Mapping

-   ## Additional Cipher

src/additional-cipher.js

### Functions:

    encrypt(plain,key):cipher
    CT = (PT + k) mod 26
    decrypt(cipher,key):plain
    PT = (CT - k) mod 26

### Requirements:

    Key must have additional inverse

### Key Domain : [0-25] ie 26

    k - 26 keys only
    including zero as key in that case we will have
    same plain and cipher text

-   ## Multiplication Cipher

src/multiplication-cipher.js

### Functions:

    encrypt(plain,key):cipher
    CT = (PT x k) mod 26
    decrypt(cipher,key):plain
    PT = (CT x inv(k)) mod 26`

### Requirements:

    k x inv(k) mod 26 = 1
    Key inverse must exists

### Key Domain : 12

    k - 12 Keys only with Key inverse
    including one as key in that case we will have
    same plain and cipher text

## 3. Affine Cipher

src/multiplication-cipher.js

### Functions:

    encrypt(plain, key: {kadd, kmul}):cipher
    CT = ((PT x kmul) + kadd) mod 26

    decrypt(cipher, key: {kadd, kmul}):plain
    PT = ((CT - kadd) x inv(kmul)) mod 26

### Requirements:

    kadd - Additional Cipher Key
    kmul - Multiplication Cipher Key
    kmul x inv(kmul) mod 26 = 1
    Key inverse must exists

### Key Domain : 26 x 12 = 312

    kadd - 26 values
    kmul - 12 values
