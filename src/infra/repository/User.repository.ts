import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Email, ID } from 'src/domain/types';
import { User } from 'src/domain/entity/User';
import { AppException } from 'src/app/exception/AppException.exceptions';

interface UserRepositoryS {
  verifyIfExistById: (id: ID) => Promise<boolean>;
  verifyIfExistByEmail: (email: Email) => Promise<boolean>;
  findOneById: (id: ID) => Promise<User | null>;
  findOneByEmail: (email: Email) => Promise<User | null>;
  createOne: (user: User) => Promise<void>;
}
@Injectable()
export class UserRepositoryInfra implements UserRepositoryS {
  constructor(
    private prisma: PrismaService,
    private appException: AppException,
  ) {}

  async verifyIfExistByEmail(email: Email) {
    try {
      return !!(await this.prisma.users.findUnique({
        where: { email },
        select: { id: true },
      }));
    } catch (err) {
      this.throwDbError(err);
    }
  }

  async verifyIfExistById(id: ID) {
    try {
      return !!(await this.prisma.users.findUnique({
        where: { id },
        select: { id: true },
      }));
    } catch (err) {
      this.throwDbError(err);
    }
  }

  async createOne(user: User) {
    try {
      await this.prisma.users.create({
        data: {
          age: user.age,
          email: user.email,
          name: user.name,
          password: user.password,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
          id: undefined,
        },
      });
    } catch (err) {
      this.throwDbError(err);
    }
  }

  async findOneById(id: ID) {
    try {
      const query = await this.prisma.users.findUnique({
        where: { id },
      });

      if (query) {
        return new User({
          ...query,
          createdAt: query.created_at,
          updatedAt: query.updated_at,
        });
      } else {
        return null;
      }
    } catch (err) {
      this.throwDbError(err);
    }
  }

  async findOneByEmail(email: Email) {
    try {
      const query = await this.prisma.users.findUnique({
        where: { email },
      });

      if (query) {
        return new User({
          age: query.age,
          email: query.email,
          name: query.name,
          password: query.password,
          createdAt: query.created_at,
          updatedAt: query.updated_at,
          id: query.id,
        });
      } else {
        return null;
      }
    } catch (err) {
      this.throwDbError(err);
    }
  }

  private throwDbError(err) {
    console.log(err);
    this.appException.throw(
      'Não foi possível realizar esse operação',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
