import { Prisma, User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'O nome está inválido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: 'O nome está inválido' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password?: string;
}

export type IUser = {
  listUsers: (payload: Prisma.UserFindManyArgs) => Promise<{
    count: number;
    rows: User[];
  }>;
  showUser: (id: string) => Promise<User | null>;
  createUser: (payload: Prisma.UserCreateArgs) => Promise<void>;
  updateUser: (payload: Prisma.UserUpdateArgs) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  findUserById: (id: string) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
};
