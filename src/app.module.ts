import { CommonModule } from '@/common/common.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';

const { NODE_ENV = 'development' } = process.env;
const isTest = NODE_ENV === 'test';
const isDev = NODE_ENV === 'development';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().default('postgresql'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_MAIN: Joi.string().required(),
        DB_TEST: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRED_TIME: Joi.string().required(),
        APP_PORT: Joi.number().required(),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        dbName: isTest ? config.get('DB_TEST') : config.get('DB_MAIN'),
        user: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        autoLoadEntities: true,
        discovery: { warnWhenNoEntities: false },
        debug: isDev ? true : false,
      }),
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule { }
