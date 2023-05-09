import { Module } from '@nestjs/common';
import { RepositoryModule } from './Repository.module';
import { UsersResolver } from '../resolver/Users.resolver';
import { AppException } from 'src/app/exception/AppException.exceptions';
import { PostsResolver } from '../resolver/Posts.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [UsersResolver, PostsResolver, AppException],
})
export class QueryModule {}
