import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { TechnicianPerformanceService } from './services/technician-performance.service';
import { SubscriptionAnalyticsService } from './services/subscription-analytics.service';
import { ForecastingService } from './services/forecasting.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService, 
    AnalyticsRepository, 
    TechnicianPerformanceService,
    SubscriptionAnalyticsService,
    ForecastingService
  ],
  exports: [
    AnalyticsService, 
    TechnicianPerformanceService, 
    SubscriptionAnalyticsService,
    ForecastingService
  ],
})
export class AnalyticsModule {}
