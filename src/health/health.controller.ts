import {
  Controller,
  Get,
  Query,
  Res,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  public async check(): Promise<HealthCheckResult | undefined> {
    const healthCheckResult = await this.healthService.check();

    for (const key in healthCheckResult?.info) {
      if (healthCheckResult?.info[key].status === 'down') {
        throw new ServiceUnavailableException(healthCheckResult);
      }
    }

    return healthCheckResult;
  }

  @Get('ok')
  public ok() {
    return { message: 'ok' };
  }

  @Get('heavy')
  public heavyTask(@Query('number') num: number) {
    const startTime = new Date();
    const result = fibonacci(num);
    const endTime = new Date();

    return {
      number: num,
      fibonacci: result,
      time: endTime.getTime() - startTime.getTime() + 'ms',
    };
  }
}

const fibonacci = (n: number) => {
  if (n <= 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};
