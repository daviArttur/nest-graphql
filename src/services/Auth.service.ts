import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/infra/dto/Login.dto';
import { UserRepositoryInfra } from 'src/infra/repository/User.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private repository: UserRepositoryInfra,
  ) {}

  async validateUser(user: LoginDto) {
    const userDb = await this.repository.findOneByEmail(user.email);

    if (!userDb || userDb.password !== user.password) {
      throw new HttpException('Email ou senha estão incorretos', 403);
    }

    const token = this.jwtService.sign(
      { subject: userDb.id },
      { expiresIn: '1h' },
    );

    return { token };
  }
}
