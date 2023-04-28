import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { APP_PORT = 3001 } = process.env;
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  await app.listen(APP_PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${APP_PORT}/${globalPrefix}`,
  );
}

bootstrap();
