import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { TechnicianPerformanceService } from './services/technician-performance.service';
import { SubscriptionAnalyticsService } from './services/subscription-analytics.service';
import { ForecastingService } from './services/forecasting.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly techPerformanceService: TechnicianPerformanceService,
    private readonly subAnalyticsService: SubscriptionAnalyticsService,
    private readonly forecastingService: ForecastingService,
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

  @Get('subscriptions/mrr')
  async getMrr() {
    return this.subAnalyticsService.getMrr();
  }

  @Get('subscriptions/churn')
  async getChurn() {
    return this.subAnalyticsService.getChurnRate();
  }

  @Get('forecast/revenue')
  async getRevenueForecast() {
    return this.forecastingService.getRevenueForecast();
  }

  @Get('forecast/occupancy')
  async getOccupancyForecast() {
    return this.forecastingService.getOccupancyForecast();
  }
}
