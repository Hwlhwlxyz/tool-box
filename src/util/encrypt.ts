import Crypto from 'crypto-js';

export function base64encode(input: string) {
    // INIT
    const myString = '75322541'; // Utf8-encoded string
    // PROCESS
    const encodedWord = Crypto.enc.Utf8.parse(input); // encodedWord Array object
    const encoded = Crypto.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}

export function base64decode(input: string) {
    let decoded = '';
    try {
        const encodedWord = Crypto.enc.Base64.parse(input); // encodedWord via Base64.parse()
        decoded = Crypto.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
        
    }
    catch (e) {
        console.log("base64decode error",e);
        decoded = 'cannot decode';
    }
    return decoded;
}

