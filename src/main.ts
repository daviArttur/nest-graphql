import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './infra/module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: true } });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
