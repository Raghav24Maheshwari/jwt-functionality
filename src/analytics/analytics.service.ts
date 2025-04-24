// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficLog } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(TrafficLog)
    private trafficRepo: Repository<TrafficLog>,
  ) {}

  async getStats() {
    const allLogs = await this.trafficRepo.find();
    const totalVisits = allLogs.length;

    const endpointCounts = allLogs.reduce((acc, log) => {
      acc[log.url] = (acc[log.url] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalVisits, endpointCounts };
  }
}
