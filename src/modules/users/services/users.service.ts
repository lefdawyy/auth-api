import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../entities/users.entity';
import { User } from '../dtos/user.dto';
import { UserToShow } from '../dtos/userToShow.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<UserToShow[]> {
    const allUsers = await this.usersRepository.find();
    let usersToShow: UserToShow[] = [];
    for (const user of allUsers) {
      const userToShow = {
        username: user.username,
        email: user.email,
        birthdate: user.birthdate,
        profile_picture: user.profile_picture,
        bio: user.bio,
        status: user.status,
        private: user.private,
      } as UserToShow;
      usersToShow.push(userToShow);
    }
    return usersToShow;
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne('id', id);
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne('username', username);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne('email', email);
  }

  async addUser(user: User): Promise<void> {
    const entity = {
      username: user.username,
      email: user.email,
      password: user.password,
      birthdate: user.birthdate,
    } as UserEntity;

    const newUser = await this.usersRepository.create(entity);
    this.usersRepository.save(newUser);
  }

  async updateUser(user: UserEntity, id: string): Promise<void> {
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    userToUpdate.username = user.username;
    userToUpdate.bio = user.bio;
    userToUpdate.email = user.email;
    userToUpdate.password = user.password;
    userToUpdate.birthdate = user.birthdate;
    userToUpdate.private = user.private;
    userToUpdate.profile_picture = user.profile_picture;
    userToUpdate.status = user.status;

    const updatedUser = await this.usersRepository.save(userToUpdate);
  }

  async deleteUserById(id: string, requestedUserId: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (requestedUserId !== id) {
      throw new UnauthorizedException(
        'You dont have permission to delete this account',
      );
    }

    await this.usersRepository.remove(user);
  }
}
