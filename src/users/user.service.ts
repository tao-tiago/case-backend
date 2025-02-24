import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './user.types';

@Injectable()
export class UserService implements IUser {
  constructor(private prisma: PrismaService) { }

  private logger = new Logger('UserService');

  async listUsers(userFindManyArgs: Prisma.UserFindManyArgs) {

    this.logger.log('listUsers');

    const [count, rows] = await this.prisma.$transaction([
      this.prisma.user.count({
        where: userFindManyArgs.where,
      }),
      this.prisma.user.findMany(userFindManyArgs),
    ]);

    return {
      count,
      rows,
    };
  }

  async showUser(id: string) {
    return await this.findUserById(id);
  }

  createUser: (payload: Prisma.UserCreateInput) => Promise<void>;
  updateUser: (payload: Prisma.UserUpdateInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
