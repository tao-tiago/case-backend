import { Prisma, User } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';

// Services
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { RedisService } from 'src/common/modules/redis/redis.service';

import { IUser } from './user.types';

@Injectable()
export class UserService implements IUser {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) { }

  private logger = new Logger('UserService');

  async listUsers(queries: Prisma.UserFindManyArgs) {
    this.logger.log('listUsers');

    const [count, rows] = await this.prisma.$transaction([
      this.prisma.user.count({
        where: queries.where,
      }),
      this.prisma.user.findMany(queries),
    ]);

    return {
      count,
      rows,
    };
  }

  async createUser(payload: Prisma.UserCreateArgs) {
    this.logger.log('createUser');

    const user = await this.prisma.user.create(payload);

    await this.redis.saveData(`user:${user.id}`, user);
  }

  async showUser(id: string) {
    this.logger.log('showUser');

    return await this.findUserById(id);
  }

  async updateUser(payload: Prisma.UserUpdateArgs) {
    this.logger.log('updateUser');

    const user = await this.prisma.user.update(payload);

    await this.redis.saveData(`user:${user.id}`, user);
  }

  async deleteUser(id: string) {
    this.logger.log('deleteUser');

    await this.prisma.user.delete({
      where: {
        id
      }
    });

    await this.redis.deleteData(`user:${id}`);
  }

  async findUserById(id: string) {
    this.logger.log('findUserById');

    const userCache = await this.redis.getData(`user:${id}`) as User;

    if (userCache) {
      return userCache;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    await this.redis.saveData(`user:${id}`, user);

    return user;
  }

  async findUserByEmail(email: string) {
    this.logger.log('findUserByEmail');

    return await this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
