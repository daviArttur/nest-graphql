import { Module } from '@nestjs/common';
import { PostsMutations } from '../mutation/Posts.mutation';
import { UsersMutation } from '../mutation/Users.mutation';
import { RepositoryModule } from './Repository.module';
import { CreateUserUseCase } from 'src/app/useCases/user/CreateUser.usecase';
import { CreatePostUseCase } from 'src/app/useCases/post/CreatePost.usecase';
import { AuthModule } from './Auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [
    CreateUserUseCase,
    CreatePostUseCase,
    PostsMutations,
    UsersMutation,
  ],
})
export class MutationsModule {}
