import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { APP_PORT = 3001 } = process.env;
  const globalPrefix = 'api';

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.enableShutdownHooks();
  app.setGlobalPrefix(globalPrefix);
  await app.listen(APP_PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${APP_PORT}/${globalPrefix}`,
  );
}

bootstrap();
