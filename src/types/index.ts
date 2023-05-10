import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Int, { description: 'Age of user' })
  age: number;
}

@ObjectType()
export class Token {
  @Field(() => String)
  token: string;
}

@ObjectType()
export class CreateUser {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => User)
  creator: User;
}
