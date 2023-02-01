import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { APP_PORT = 3001 } = process.env;

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // Swagger API Document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chat Service API')
    .setDescription(
      'Optional multiline or single-line description in CommonMark](http://commonmark.org/help/) or HTML.',
    )
    .setVersion('0.1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, swaggerDocument);

  logger.log(`Listening for HTTP on http://localhost:${APP_PORT}`);
  app.enableShutdownHooks();
  await app.listen(APP_PORT);
}
bootstrap();
