import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsMiddleware } from './analytics.middleware';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TrafficLog } from './entities/analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficLog])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnalyticsMiddleware).forRoutes('*');
  }
}
