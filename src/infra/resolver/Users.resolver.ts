import { Resolver, Query, Context } from '@nestjs/graphql';
import { User } from '../../types';
import { UseInterceptors } from '@nestjs/common';
import { JwtInterceptor } from 'src/infra/interceptor/Jwt.interceptor';
import { QueryRepositoryInfra } from '../repository/Query.repository';

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
}
