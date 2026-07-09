import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  async getStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('revenue')
  async getRevenue() {
    return this.analyticsService.getRevenueChart();
  }
}
