import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';
import { MinioService } from './minio.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [CommonService, MinioService],
  exports: [JwtModule, CommonService, MinioService],
})
export class CommonModule { }
