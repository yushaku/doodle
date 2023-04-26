import { UserEntity } from '@/databases/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: EntityRepository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException("User's id does not exist");
    return user;
  }

  async create(user: CreateUserDto) {
    const userSchema = this.usersRepository.create(user);
    this.usersRepository.persistAndFlush(userSchema);
    return userSchema;
  }
}
