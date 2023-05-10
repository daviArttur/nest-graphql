import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { Content, Title } from 'src/domain/types';

@InputType()
export class CreatePostDtoInfra {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: Title;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  content: Content;
}

@InputType()
export class FindAllPostArgs {
  @Field(() => Number, {
    description: 'number to jump rows on query results in database',
  })
  @IsNumber()
  skip: number;

  @Field(() => Number, { description: 'select quantity to get of database' })
  @IsNumber()
  @Max(32)
  quantity: number;

  @Field(() => Boolean, {
    description: 'include creators of posts',
    defaultValue: false,
  })
  @IsBoolean()
  includeCreators: boolean;
}

@InputType()
export class FindUserPostsByUserIdArgs {
  @Field(() => Number, {
    nullable: true,
    defaultValue: 6,
    description: 'select quantity to get of database',
  })
  @IsNumber()
  @IsOptional()
  @Max(32)
  quantity: number;

  @Field(() => Number, {
    description: 'number to jump rows on query results in database',
  })
  @IsNumber()
  skip: number;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsBoolean()
  @IsOptional()
  mostRecent: boolean;
}
