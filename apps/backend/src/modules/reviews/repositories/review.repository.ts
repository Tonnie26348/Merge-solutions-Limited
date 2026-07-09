import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReviewDto } from '../dto/review.dto';

@Injectable()
export class ReviewRepository {
  private prisma = new PrismaClient();

  async createReview(data: CreateReviewDto, authorId: string) {
    return this.prisma.review.create({
      data: {
        ...data,
        authorId: authorId,
      },
    });
  }

  async getReviewsByTechnician(technicianId: string) {
    return this.prisma.review.findMany({
      where: { targetTechnicianId: technicianId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async calculateAverageRating(technicianId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { targetTechnicianId: technicianId },
      _avg: { rating: true },
    });
    return aggregate._avg.rating || 0;
  }

  async updateTechnicianRating(technicianId: string, newAverage: number) {
    return this.prisma.technician.update({
      where: { id: technicianId },
      data: { averageRating: newAverage },
    });
  }
}
