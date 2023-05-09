import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class CreateUserDtoInfra {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  password: string;

  @Field(() => Int)
  @IsNumber()
  @Min(18)
  @Max(120)
  age: number;
}
