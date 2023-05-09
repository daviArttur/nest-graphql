import { Injectable, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Context } from '@nestjs/graphql';
import { CreatePostDtoInfra } from '../dto/CreatePost.dto';
import { Post } from 'src/types';
import { CreatePostUseCase } from 'src/app/useCases/post/CreatePost.usecase';
import { JwtInterceptor } from '../interceptor/Jwt.interceptor';

@Injectable()
export class PostsMutations {
  constructor(private usecase: CreatePostUseCase) {}

  @UseInterceptors(JwtInterceptor)
  @Mutation(() => Post, { nullable: true, name: 'createPost' })
  async createPost(@Args('dto') dto: CreatePostDtoInfra, @Context() ctx: any) {
    await this.usecase.execute(dto, ctx.req.user.subject);
  }
}
