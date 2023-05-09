import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
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
  @Field(() => Number)
  @IsNumber()
  skip: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Max(32)
  quantity: number;
}
