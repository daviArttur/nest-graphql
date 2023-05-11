import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/types';
import { QueryRepositoryInfra } from '../repository/Query.repository';
import { FindAllPostArgs, FindUniquePostByIdArgs } from '../dto/CreatePost.dto';

@Resolver()
export class PostsResolver {
  constructor(private repostirory: QueryRepositoryInfra) {}

  @Query(() => [Post], { name: 'posts' })
  async findPosts(@Args('args') args: FindAllPostArgs) {
    const result = await this.repostirory.findAllPosts(args);

    const remapedResult = result.map((r) => {
      const result = { ...r, creator: r.Users };
      delete result.Users;
      return result;
    });

    return remapedResult;
  }

  @Query(() => Post, { name: 'post' })
  async findUniquePostById(@Args('args') args: FindUniquePostByIdArgs) {
    return await this.repostirory.findPostById(args);
  }
}
