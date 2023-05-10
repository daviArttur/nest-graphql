import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Email, ID } from 'src/domain/types';
import {
  FindAllPostArgs,
  FindUserPostsByUserIdArgs,
} from '../dto/CreatePost.dto';

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

  async findPostsByUserId(userId: ID, args: FindUserPostsByUserIdArgs) {
    try {
      return await this.prisma.posts.findMany({
        where: { userId },
        take: args.quantity,
        skip: args.skip,
        orderBy: {
          id: args.mostRecent ? 'desc' : 'asc',
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
    console.log(args);
    try {
      return await this.prisma.posts.findMany({
        skip: args.skip,
        take: args.quantity,
        include: {
          Users: args.includeCreators,
        },
      });
    } catch (err) {}
  }
}
