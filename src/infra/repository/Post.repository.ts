import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Post } from 'src/domain/entity/Post';
import { ID } from 'src/domain/types';

interface PostRepository {
  createOne: (post: Post, userId: ID) => Promise<void>;
}

@Injectable()
export class PostRepositoryInfra implements PostRepository {
  constructor(private prisma: PrismaService) {}
  async createOne(post: Post, userId: ID) {
    try {
      await this.prisma.posts.createMany({
        data: {
          content: post.content,
          title: post.title,
          created_at: post.createdAt,
          updated_at: post.updatedAt,
          userId,
        },
      });
    } catch (err) {}
  }
}
