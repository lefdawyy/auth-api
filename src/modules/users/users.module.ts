import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { JwtConfigModule } from 'src/core/config/jwt.config';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
