import { PrismaService } from 'nestjs-prisma';
import { AppException } from 'src/app/exception/AppException.exceptions';

import { UserRepositoryInfra } from 'src/infra/repository/User.repository';
import { CreateUserUseCase } from './CreateUser.usecase';
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: UserRepositoryInfra;
  let appException: AppException;

  beforeEach(() => {
    repository = new UserRepositoryInfra(
      new PrismaService(),
      new AppException(),
    );
    appException = new AppException();
    useCase = new CreateUserUseCase(repository, appException);
  });

  describe('execute', () => {
    it('should throw an exception if the user email already exists', async () => {
      // Arrange
      const dto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        password: 'asasss',
      };
      jest.spyOn(repository, 'verifyIfExistByEmail').mockResolvedValue(true);
      jest.spyOn(appException, 'throw');

      // Act
      await useCase.execute(dto);

      // Assert
      expect(repository.verifyIfExistByEmail).toHaveBeenCalledWith(dto.email);
      expect(appException.throw).toHaveBeenCalledWith(
        'Já existe um usuário cadastrado com esse e-mail',
        409,
      );
    });

    it('should create a new user if the user email does not exist', async () => {
      // Arrange
      const dto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        password: 'asasss',
      };
      jest.spyOn(repository, 'verifyIfExistByEmail').mockResolvedValue(false);
      jest.spyOn(repository, 'createOne');
      jest.spyOn(appException, 'throw');

      // Act
      await useCase.execute(dto);

      // Assert
      expect(repository.verifyIfExistByEmail).toHaveBeenCalledWith(dto.email);
      expect(repository.createOne).toHaveBeenCalledTimes(1);
      expect(repository.createOne).toHaveBeenCalledWith({
        ...dto,
        id: -1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(appException.throw).not.toHaveBeenCalled();
    });

    it('should throw an exception if the user age is invalid', async () => {
      // Arrange
      const dto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        password: 'asasss',
      };
      jest.spyOn(repository, 'verifyIfExistByEmail').mockResolvedValue(false);
      jest.spyOn(appException, 'throw');

      // Act
      await useCase.execute(dto);

      // Assert
      expect(repository.verifyIfExistByEmail).toHaveBeenCalledWith(dto.email);
      expect(appException.throw).toHaveBeenCalledWith(
        'A idade deve ser maior ou igual a 0',
        400,
      );
    });
  });
});
