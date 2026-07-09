import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVacancyDto, ApplyToVacancyDto } from '../dto/vacancy.dto';

@Injectable()
export class VacancyRepository {
  private prisma = new PrismaClient();

  async createVacancy(data: CreateVacancyDto) {
    return this.prisma.vacancy.create({ data });
  }

  async findPublishedVacancies(filters: { category?: string, maxRent?: number }) {
    return this.prisma.vacancy.findMany({
      where: {
        status: 'PUBLISHED',
        rentAmount: filters.maxRent ? { lte: filters.maxRent } : undefined,
      },
      include: { 
        landlord: true,
        unit: true 
      },
    });
  }

  async applyToVacancy(data: ApplyToVacancyDto) {
    return this.prisma.vacancyApplication.create({ data });
  }

  async updateApplicationStatus(id: string, status: string) {
    return this.prisma.vacancyApplication.update({
      where: { id },
      data: { status },
    });
  }

  async findApplicationsByVacancy(vacancyId: string) {
    return this.prisma.vacancyApplication.findMany({
      where: { vacancyId },
      include: { applicant: true },
    });
  }
}
