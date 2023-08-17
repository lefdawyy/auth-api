import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/dtos/user.dto';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  async generateLoginToken(id: string, username: string): Promise<string> {
    const payload = { sub: id, username: username };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async generateVerificationToken(email: string): Promise<string> {
    const verificationToken = this.jwtService.sign({ email });
    return verificationToken;
  }

  async verifyEmailToken(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token);
      return {
        username: decoded.username,
        email: decoded.email,
        password: decoded.password,
        birthdate: decoded.birthdate,
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
