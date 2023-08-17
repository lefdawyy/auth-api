import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtConfigModule } from 'src/core/config/jwt.config';
import { LocalStrategy } from './stratigies/local.stratigy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratigies/jwt.stratigy';
import { JwtUtil } from './jwt/jwt.Util';
import { EmailService } from 'src/common/mail/emailService.mail';

@Module({
  imports: [UsersModule, JwtConfigModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, EmailService, JwtStrategy, JwtUtil],
})
export class AuthModule {}
