import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RepositoryModule } from './Repository.module';
import { AuthModule } from './Auth.module';
import { MutationsModule } from './Mutations.module';
import { QueryModule } from './Query.module';

@Module({
  imports: [
    AuthModule,
    MutationsModule,
    QueryModule,
    RepositoryModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
