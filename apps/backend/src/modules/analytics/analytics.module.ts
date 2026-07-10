import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { TechnicianPerformanceService } from './services/technician-performance.service';
import { SubscriptionAnalyticsService } from './services/subscription-analytics.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService, 
    AnalyticsRepository, 
    TechnicianPerformanceService,
    SubscriptionAnalyticsService
  ],
  exports: [AnalyticsService, TechnicianPerformanceService, SubscriptionAnalyticsService],
})
export class AnalyticsModule {}
