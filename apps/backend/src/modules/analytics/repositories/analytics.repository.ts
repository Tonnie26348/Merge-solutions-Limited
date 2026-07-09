import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnalyticsRepository {
  private prisma = new PrismaClient();

  async getTotalUsers() {
    return this.prisma.user.count();
  }

  async getTotalRevenue() {
    const aggregate = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESSFUL' },
    });
    return aggregate._sum.amount || 0;
  }

  async getActiveBuildingsCount() {
    return this.prisma.apartment.count();
  }

  async getCompletedJobsCount() {
    return this.prisma.booking.count({
      where: { status: 'COMPLETED' },
    });
  }

  async getMonthlyRevenue() {
    // Mocked logic for monthly breakdown
    return [
      { month: 'January', revenue: 5000 },
      { month: 'February', revenue: 7000 },
      { month: 'March', revenue: 6000 },
    ];
  }
}
