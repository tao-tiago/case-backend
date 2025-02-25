import { Module } from '@nestjs/common';

import { PrismaModule } from '../../src/common/modules/prisma/prisma.module';
import { RedisModule } from '../../src/common/modules/redis/redis.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
