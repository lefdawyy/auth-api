import * as crypto from 'crypto';

export class HashUtil {
  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return `${hashedPassword}.${salt}`;
  }

  static verifyPassword(
    password: string,
    hashedPasswordWithSalt: string,
  ): boolean {
    const [hashedPassword, salt] = hashedPasswordWithSalt.split('.');
    const calculatedHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return calculatedHash === hashedPassword;
  }

  private static generateRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  static jwtSecret = this.generateRandomString(64);
}
