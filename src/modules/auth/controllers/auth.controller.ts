import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/modules/users/dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: User) {
    this.authService.register(userDto);
    return {
      message: 'Account created successfully',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(loginDto);
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string): Promise<string> {
    return this.authService.verifyAccount(token);
  }
}
