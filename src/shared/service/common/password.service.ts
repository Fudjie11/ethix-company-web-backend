import { hashSync } from 'bcrypt'
import { User } from '../../../../libs/dh-db/src/entities/credential/user';
import crypto = require('crypto');

export class PasswordService {

  public static hash (password: string): string {
    return hashSync(password, 10)
  }

  public static validate (user: User, password: string) {
    const hash = crypto.pbkdf2Sync(password, user._passwordSalt, 10000, 512, 'sha512').toString('hex');

    if (user._password === hash) {
      return true;
    }

    return false;
  }
}
