import { Prisma, User } from '@prisma/client';

export type IUser = {
  listUsers: (payload: Prisma.UserFindManyArgs) => Promise<{
    count: number;
    rows: User[];
  }>;
  showUser: (id: string) => Promise<User | null>;
  createUser: (payload: Prisma.UserCreateInput) => Promise<void>;
  updateUser: (payload: Prisma.UserUpdateInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  findUserById: (id: string) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
};
