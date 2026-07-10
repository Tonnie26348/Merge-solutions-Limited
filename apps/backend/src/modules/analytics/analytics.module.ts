import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { TechnicianPerformanceService } from './services/technician-performance.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository, TechnicianPerformanceService],
  exports: [AnalyticsService, TechnicianPerformanceService],
})
export class AnalyticsModule {}
