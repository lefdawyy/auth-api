import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/users.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DeleteUserDto } from '../dtos/deleteUser.dto';
import { UserToShow } from '../dtos/userToShow.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserToShow[]> {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() request): Promise<UserEntity> {
    return await this.usersService.getUserById(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Request() request, @Body() deleteUserDto: DeleteUserDto) {
    this.usersService.deleteUserById(deleteUserDto.id, request.user.userId);
    return {
      message: 'User deleted successfully',
    };
  }
}
