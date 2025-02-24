import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { IUser } from './user.types';

@Injectable()
export class UserService implements IUser {
  constructor(private prisma: PrismaService) { }

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

    await this.prisma.user.create(payload);
  }

  async showUser(id: string) {
    this.logger.log('showUser');

    return await this.findUserById(id);
  }

  async updateUser(payload: Prisma.UserUpdateArgs) {
    this.logger.log('updateUser');

    await this.prisma.user.update(payload);
  }

  async deleteUser(id: string) {
    this.logger.log('deleteUser');

    await this.prisma.user.delete({
      where: {
        id
      }
    });
  }

  async findUserById(id: string) {
    this.logger.log('findUserById');

    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
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
