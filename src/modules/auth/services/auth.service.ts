import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/dtos/user.dto';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { HashUtil } from 'src/common/utils/hash.util';
import { EmailService } from 'src/common/mail/emailService.mail';
import { JwtUtil } from '../jwt/jwt.Util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async register(userDto: User): Promise<void> {
    const existingUsername = await this.usersService.getUserByUsername(
      userDto.username,
    );
    if (existingUsername) {
      throw new UnauthorizedException('Username already taken');
    }

    const existingEmail = await this.usersService.getUserByEmail(userDto.email);
    if (existingEmail) {
      throw new UnauthorizedException('Email already taken');
    }

    const hashedPassword = HashUtil.hashPassword(userDto.password);

    const verificationCode = this.jwtService.sign({
      email: userDto.email,
      username: userDto.username,
      password: hashedPassword,
      birthdate: userDto.birthdate,
    });
    await this.emailService.sendVerificationEmail(
      userDto.email,
      verificationCode,
    );
  }

  async login(credentials: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(credentials);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtUtil.generateLoginToken(
      user.id,
      user.username,
    );

    return { accessToken };
  }

  async validateUser(credentials: LoginDto): Promise<UserEntity | null> {
    const user =
      (await this.usersService.getUserByUsername(credentials.username)) ||
      (await this.usersService.getUserByEmail(credentials.username));

    if (!user || !HashUtil.verifyPassword(credentials.password, user.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }
    
    return user;
  }

  async verifyAccount(token: string): Promise<string> {
    try {
      const decoded = (await this.jwtUtil.verifyEmailToken(token));
        await this.usersService.addUser(decoded);
      return 'Email verified successfully.';
    } catch (error) {
      return 'Email verification failed.';
    }
  }
}
