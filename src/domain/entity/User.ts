import { CreateUserDto } from '../dto/CreateUser.dto';
import { Age, Email, ID, Name, Password } from '../types';

export class User {
  id: ID;
  email: Email;
  password: Password;
  name: Name;
  createdAt: Date;
  updatedAt: Date;
  age: Age;

  constructor(dto: CreateUserDto) {
    this.id = dto.id;
    this.email = dto.email;
    this.password = dto.password;
    this.name = dto.name;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
    this.age = dto.age;
  }

  static validateAge(age: Age) {
    if (!age || age < 18) {
      throw Error('A idade do usuário deve ser maior que 18');
    }
  }
}
