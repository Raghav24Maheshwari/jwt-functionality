// src/analytics/analytics.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficLog } from './entities/analytics.entity';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AnalyticsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(TrafficLog)
    private trafficRepo: Repository<TrafficLog>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const log = this.trafficRepo.create({
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
      userAgent: req.headers['user-agent'] || '',
      timestamp: Date.now(),
    });
    await this.trafficRepo.save(log);
    next();
  }
}
