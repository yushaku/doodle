import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService
  ) { }

  @Get()
  getHello() {
    return { message: 'doodle backend is working!!!' };
  }

  @Get('/health')
  @HealthCheck()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
