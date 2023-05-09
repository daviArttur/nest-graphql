import { AppException } from 'src/app/exception/AppException.exceptions';
import { User } from 'src/domain/entity/User';
import { Injectable } from '@nestjs/common';
import { CreateUserDtoInfra } from 'src/infra/dto/CreateUser.dto';
import { UserRepositoryInfra } from 'src/infra/repository/User.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private repository: UserRepositoryInfra,
    private appException: AppException,
  ) {}

  async execute(dto: CreateUserDtoInfra) {
    if (!(await this.validateEmail(dto))) {
      this.appException.throw(
        'Já existe um usuário cadastrado com esse e-mail',
        409,
      );
    }

    User.validateAge(dto.age);
    const NewUser = new User({
      ...dto,
      id: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.repository.createOne(NewUser);
  }

  private async validateEmail(dto: CreateUserDtoInfra) {
    return !(await this.repository.verifyIfExistByEmail(dto.email));
  }
}
