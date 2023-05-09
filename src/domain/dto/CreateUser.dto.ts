import { Age, Email, ID, Name, Password } from '../types';

export class CreateUserDto {
  id: ID;
  email: Email;
  password: Password;
  name: Name;
  createdAt: Date;
  updatedAt: Date;
  age: Age;
}
