import { Injectable } from '@nestjs/common';
import { AppException } from 'src/app/exception/AppException.exceptions';
import { Post } from 'src/domain/entity/Post';
import { ID } from 'src/domain/types';
import { CreatePostDtoInfra } from 'src/infra/dto/CreatePost.dto';
import { PostRepositoryInfra } from 'src/infra/repository/Post.repository';
import { UserRepositoryInfra } from 'src/infra/repository/User.repository';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private userRepository: UserRepositoryInfra,
    private postRepository: PostRepositoryInfra,
    private appException: AppException,
  ) {}

  async execute(dto: CreatePostDtoInfra, userId: ID) {
    const NewPost = new Post({
      id: -1,
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userExist = await this.userRepository.verifyIfExistById(userId);

    if (!userExist) {
      this.appException.throw('Usuário não foi encontrado', 404);
    }

    await this.postRepository.createOne(NewPost, userId);
  }
}
