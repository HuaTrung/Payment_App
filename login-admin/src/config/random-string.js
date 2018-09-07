const crypto = require('crypto');

const generate = function() {
    
    const numbers = '0123456789';    
    const charsLower = 'abcdefghijklmnopqrstuvwxyz';
    const charsUpper = charsLower.toUpperCase();

    var length = 32, string = '';
    var chars = numbers + charsLower + charsUpper;

    var charsLen = chars.length;
    var maxByte = 256 - (256 % charsLen);
    while (length > 0) {
       var buff = safeRandomBytes(Math.ceil(length*256 / maxByte));
       for(var i = 0; i< buff.length && length > 0;i++) {
           var randomByte = buff.readUInt8(i);
           if(randomByte < maxByte) {
               string += chars.charAt(randomByte % charsLen);
           }
       }
    }
    return string;
}

function safeRandomBytes(length) {
    while (true) {
        try {
            return crypto.randomBytes(length);
        } catch(e) {
            continue;
        }
    }
}

module.exports.generate = generate;