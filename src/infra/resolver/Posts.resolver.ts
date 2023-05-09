import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/types';
import { QueryRepositoryInfra } from '../repository/Query.repository';
import { FindAllPostArgs } from '../dto/CreatePost.dto';

@Resolver()
export class PostsResolver {
  constructor(private repostirory: QueryRepositoryInfra) {}

  @Query(() => [Post], { name: 'posts' })
  async findPosts(@Args('args') args: FindAllPostArgs) {
    return await this.repostirory.findAllPosts(args);
  }
}
