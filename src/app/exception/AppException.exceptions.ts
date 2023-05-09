import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppException {
  throw(message: string, statusCode: HttpStatus) {
    throw new HttpException(message, statusCode);
  }
}
