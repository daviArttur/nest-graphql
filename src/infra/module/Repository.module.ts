import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserRepositoryInfra } from 'src/infra/repository/User.repository';
import { QueryRepositoryInfra } from '../repository/Query.repository';
import { AppException } from 'src/app/exception/AppException.exceptions';
import { PostRepositoryInfra } from '../repository/Post.repository';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: { prismaOptions: { log: ['error'] } },
    }),
  ],
  providers: [
    UserRepositoryInfra,
    QueryRepositoryInfra,
    AppException,
    PostRepositoryInfra,
  ],
  exports: [UserRepositoryInfra, QueryRepositoryInfra, PostRepositoryInfra],
})
export class RepositoryModule {}
