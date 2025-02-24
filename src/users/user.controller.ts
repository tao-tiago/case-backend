import { Prisma } from '@prisma/client';

import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryOptionsDto } from 'src/shared/helpers/query-options.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async listUsers(
    @Query() query: QueryOptionsDto
  ) {
    const { orderBy, order, page: skip, size: take } = query;
    const where: Prisma.UserWhereInput = {}

    return await this.userService.listUsers({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take
    });
  }

  async showUser(id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      return "User not found"
    }

    return user
  }

  createUser: (payload: Prisma.UserCreateInput) => Promise<string>;
  updateUser: (payload: Prisma.UserUpdateInput) => Promise<string>;
  deleteUser: (id: string) => Promise<string>;
}
