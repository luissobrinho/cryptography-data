const CryptoJS = require("crypto-js");

const {message, privateKey} = {message: 'Teste', privateKey: '2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91'}; // ...
console.log('Input:', message);

let utf8Encode = new TextEncoder();
const buffer = utf8Encode.encode(message)
console.log("data in bytes:", buffer);

const data = CryptoJS.AES.encrypt(JSON.stringify(buffer), privateKey).toString();
console.log('Key generate:', data);


const ciphertext = CryptoJS.Rabbit.encrypt(data, privateKey).toString();
console.log('cryptography data:', ciphertext);


const bytes = CryptoJS.Rabbit.decrypt(ciphertext, privateKey).toString(CryptoJS.enc.Utf8);
console.log('bytes', bytes);

const originalBytes = JSON.parse(CryptoJS.AES.decrypt(bytes, privateKey).toString(CryptoJS.enc.Utf8));
console.log('originalBytes: ', originalBytes);

const keysToUpdate = Object.keys(originalBytes);

let arrBytes = []
keysToUpdate.map((key) => {
    const value = originalBytes?.[key];
    if (value) {
        arrBytes[key] = value;
    }
});
console.log('bytes:', arrBytes);
let u8arr = new Uint8Array(arrBytes);

const text = new TextDecoder().decode(u8arr);
console.log('Output:', text);
