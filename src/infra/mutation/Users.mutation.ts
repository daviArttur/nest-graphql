import { Args, Mutation } from '@nestjs/graphql';
import { CreateUser, Token } from 'src/types';
import { AuthService } from 'src/services/Auth.service';
import { CreateUserDtoInfra } from '../dto/CreateUser.dto';
import { LoginDto } from '../dto/Login.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/useCases/user/CreateUser.usecase';

@Injectable()
export class UsersMutation {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authService: AuthService,
  ) {}

  @Mutation(() => CreateUser, { nullable: true })
  async createUser(@Args('dto') dto: CreateUserDtoInfra) {
    await this.createUserUseCase.execute(dto);
  }

  @Mutation(() => Token)
  async login(@Args('dto') dto: LoginDto) {
    return await this.authService.validateUser(dto);
  }
}
