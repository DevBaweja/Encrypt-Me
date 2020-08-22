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

# Mono Alphabetic Cipher -

A monoalphabetic cipher is any cipher in which the letters of the plain text are mapped to cipher text letters based on a single alphabetic key.
One to One Mapping

## 1. Additional Cipher

src/additional-cipher.js

### Functions:

    encrypt(plain,key):cipher
    CT = (PT+k) mod 26
    decrypt(cipher,key):plain
    PT = (CT-k) mod 26

### Requirements:

    Key must have additional inverse

### Key Domain : [1-25] ie 25

    Excluding zero we got only 25 as key with zero as key
    is essentially the same plain and cipher text

## 2. Multiplication Cipher

src/multiplication-cipher.js

### Functions:

    encrypt(plain,key):cipher
    CT = (PTxk) mod 26
    decrypt(cipher,key):plain
    PT = (CTxinv(k)) mod 26`

### Requirements:

    kxinv(k) mod 26 = 1
    Key inverse must exists

### Key Domain : [1-25] ie 25

    12 Keys only with Key inverse
    including one as key in that case we will have
    same plain and cipher text
