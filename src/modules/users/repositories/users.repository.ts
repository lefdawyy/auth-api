import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { Connection, Repository } from 'typeorm';
import { User } from '../dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly connection: Connection,
  ) {}

  async findOne(type: string, value: string): Promise<UserEntity> {
    if (!this.usersRepository.metadata.hasColumnWithPropertyPath(type)) {
        throw new Error(`${type} column not found`)
    }
    return await this.usersRepository.findOne({ where: { [type]: value } });
  }

  async find(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async create(user: User): Promise<UserEntity> {
    return this.usersRepository.create(user);
  }

  async save(user: UserEntity): Promise<void> {
    await this.usersRepository.save(user);
  }

  async remove(user: UserEntity): Promise<void> {
    await this.usersRepository.remove(user);
  }
}
