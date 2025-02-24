import { Prisma } from '@prisma/client';

import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryOptionsDTO } from 'src/common/helpers/query-options.dto';
import { CreateUserDTO, UpdateUserDTO } from './user.types';
import { Response } from 'express';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async listUsers(
    @Query() query: QueryOptionsDTO
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

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
    @Res() response: Response
  ) {
    const userExists = await this.userService.findUserByEmail(createUserDTO.email);

    if (userExists) {
      throw new BadRequestException(['E-mail já cadastrado']);
    }

    await this.userService.createUser({
      data: createUserDTO
    });

    response.status(201).json({ message: ['Usuário criado com sucesso'] });
  }

  @Get(':id')
  async showUser(
    @Param('id') id: string
  ) {
    const userExists = await this.userService.findUserById(id);

    if (!userExists) {
      throw new NotFoundException(['Usuário não existe']);
    }

    return userExists
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @Res() response: Response
  ) {
    const userExists = await this.userService.findUserById(id);

    if (!userExists) {
      throw new NotFoundException(['Usuário não existe']);
    }

    await this.userService.updateUser({
      where: {
        id
      },
      data: updateUserDTO
    });

    response.status(200).json({ message: ['Usuário atualizado com sucesso'] });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const userExists = await this.userService.findUserById(id);

    if (!userExists) {
      throw new NotFoundException(['Usuário não existe']);
    }

    await this.userService.deleteUser(id);

    response.status(200).json({ message: ['Usuário excluído com sucesso'] });
  }
}
