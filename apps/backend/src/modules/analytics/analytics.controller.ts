import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { TechnicianPerformanceService } from './services/technician-performance.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly techPerformanceService: TechnicianPerformanceService,
  ) {}

  @Get('stats')
  async getStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('revenue')
  async getRevenue() {
    return this.analyticsService.getRevenueChart();
  }

  @Get('technicians/:id/performance')
  async getTechnicianPerformance(@Param('id') id: string) {
    return this.techPerformanceService.getPerformance(id);
  }
}
