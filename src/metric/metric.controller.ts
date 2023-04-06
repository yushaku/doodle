import { Controller, Get } from '@nestjs/common';
import { MetricService } from './metric.service';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Get()
  public metrics(): Promise<string> {
    return this.metricService.metrics;
  }
}
