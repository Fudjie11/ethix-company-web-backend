import crypto = require('crypto');

export class EncryptHelper {
    public static stringToMD5(text: string, parseToUTF8: boolean = true) {
        const md5 = crypto.createHash('md5').update(text).digest('hex');
        return md5;
    }
}
