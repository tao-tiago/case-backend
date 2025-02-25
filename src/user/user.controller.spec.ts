/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/common/modules/prisma/prisma.module';
import { RedisModule } from '../../src/common/modules/redis/redis.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    const mockUserService = {
      findUserById: jest.fn((id) =>
        id === 'uuid-hash'
          ? { id: 'uuid-hash', name: 'John Doe', password: '123456' }
          : undefined
      ),
    };

    module = await Test.createTestingModule({
      imports: [PrismaModule, RedisModule],
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Should return a user by ID', () => {
    expect(controller.showUser("uuid-hash")).resolves.toEqual({ id: "uuid-hash", name: 'John Doe', password: '123456' });
    expect(controller.showUser("uuid")).rejects.toThrow(NotFoundException);
  });
});
