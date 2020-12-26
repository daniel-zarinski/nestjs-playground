import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ firstName, lastName, password, email }: User): Promise<User> {
    const user = new User({ firstName, lastName, password, email });

    if (await this.usersRepository.findOne({ email })) {
      throw new NotAcceptableException(`The email ${email} is already taken.`);
    }

    return this.usersRepository.save({
      ...user,
      password: await this.encryptPassword(password),
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createMany(users: User[]) {
    await this.usersRepository.manager.transaction(async (manager) => {
      await Promise.all(users.map((user) => manager.save(user)));
    });
  }

  async encryptPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(rawPassword, encryptedPassword) {
    return bcrypt.compare(rawPassword, encryptedPassword);
  }
}
