import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  MemoryHealthIndicator, MikroOrmHealthIndicator
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private db: MikroOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) { }

  healthCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.db.pingCheck('database'),
    ]);
  }
}


