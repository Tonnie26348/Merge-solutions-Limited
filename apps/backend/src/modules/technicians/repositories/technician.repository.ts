import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTechnicianProfileDto, UpdateTechnicianStatusDto, AddCategoryToTechDto } from '../dto/technician.dto';

@Injectable()
export class TechnicianRepository {
  private prisma = new PrismaClient();

  async createProfile(data: CreateTechnicianProfileDto) {
    return this.prisma.technician.create({ data });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.technician.update({
      where: { id },
      data: { verificationStatus: status },
    });
  }

  async addCategory(data: AddCategoryToTechDto) {
    return this.prisma.technicianCategory.create({ data });
  }

  async findVerifiedTechnicians(categoryId?: string) {
    return this.prisma.technician.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        isAvailable: true,
        categories: categoryId ? {
          some: { categoryId }
        } : undefined,
      },
      include: {
        user: true,
        categories: {
          include: { category: true }
        }
      }
    });
  }

  async findById(id: string) {
    return this.prisma.technician.findUnique({
      where: { id },
      include: { 
        user: true, 
        categories: { include: { category: true } } 
      }
    });
  }
}
