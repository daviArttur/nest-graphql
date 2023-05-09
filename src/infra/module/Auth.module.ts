import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/services/Auth.service';

import { RepositoryModule } from './Repository.module';
import { AppException } from 'src/app/exception/AppException.exceptions';
@Module({
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: '12345',
    }),
  ],
  providers: [AuthService, AppException],
  exports: [AuthService, AppException],
})
export class AuthModule {}
