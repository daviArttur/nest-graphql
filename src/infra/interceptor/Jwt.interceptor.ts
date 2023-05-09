import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class JwtInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let request: Request;
    try {
      request = context.getArgs()[2].req;
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', 401);
    }
    const bearerTokenString = request.headers.authorization;
    const regexToVerifyIfContainBearer = /Bearer /.test(bearerTokenString);
    if (!bearerTokenString || !regexToVerifyIfContainBearer) {
      throw new HttpException('UNAUTHORIZED', 401);
    }
    const jwtService = new JwtService({ secret: '12345' });
    const indexOfSpaceBar = 7;
    const extractedToken = bearerTokenString.substring(indexOfSpaceBar);
    const promiseResult = jwtService.verifyAsync(extractedToken);
    promiseResult
      .then(() => {
        request.user = jwtService.decode(extractedToken);
      })
      .catch(() => {
        throw new HttpException('UNAUTHORIZED', 401);
      });
    return next.handle();
  }
}
