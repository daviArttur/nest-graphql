import {
  Resolver,
  Query,
  Context,
  Parent,
  ResolveField,
  Args,
} from '@nestjs/graphql';
import { Post, User } from '../../types';
import { UseInterceptors } from '@nestjs/common';
import { JwtInterceptor } from 'src/infra/interceptor/Jwt.interceptor';
import { QueryRepositoryInfra } from '../repository/Query.repository';
import { FindUserPostsByUserIdArgs } from '../dto/CreatePost.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private repository: QueryRepositoryInfra) {}

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return await this.repository.findAllUsers();
  }

  @UseInterceptors(JwtInterceptor)
  @Query(() => User, { name: 'user' })
  async getUser(@Context() ctx: any) {
    return await this.repository.findOneUserById(ctx.req.user.subject);
  }

  @ResolveField(() => [Post], { name: 'posts', nullable: true })
  async getPostsOfUser(
    @Args('args') args: FindUserPostsByUserIdArgs,
    @Parent() user: User,
  ) {
    return await this.repository.findPostsByUserId(user.id, args);
  }
}
