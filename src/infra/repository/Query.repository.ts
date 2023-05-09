import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Email, ID } from 'src/domain/types';
import { FindAllPostArgs } from '../dto/CreatePost.dto';

@Injectable()
export class QueryRepositoryInfra {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    try {
      return await this.prisma.users.findMany();
    } catch (err) {}
  }

  async findOneUserById(id: ID) {
    try {
      return await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {}
  }

  async findOneByEmail(email: Email) {
    try {
      return await this.prisma.users.findUnique({
        where: {
          email,
        },
      });
    } catch (err) {}
  }

  async findAllPosts(args: FindAllPostArgs) {
    try {
      return await this.prisma.posts.findMany({
        skip: args.skip,
        take: args.quantity,
      });
    } catch (err) {}
  }
}
