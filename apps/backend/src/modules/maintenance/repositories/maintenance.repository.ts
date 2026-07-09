import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMaintenanceRequestDto, CreateBookingDto } from '../dto/maintenance.dto';

@Injectable()
export class MaintenanceRepository {
  private prisma = new PrismaClient();

  async createRequest(data: CreateMaintenanceRequestDto) {
    return this.prisma.maintenanceRequest.create({ data });
  }

  async createBooking(data: CreateBookingDto) {
    return this.prisma.booking.create({ data });
  }

  async updateBookingStatus(id: string, status: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }

  async updateRequestStatus(id: string, status: string) {
    return this.prisma.maintenanceRequest.update({
      where: { id },
      data: { status },
    });
  }

  async findRequestsByResident(residentId: string) {
    return this.prisma.maintenanceRequest.findMany({
      where: { residentId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findRequestsByCategory(categoryId: string) {
    return this.prisma.maintenanceRequest.findMany({
      where: { categoryId, status: 'OPEN' },
      include: { resident: { include: { user: true } }, unit: true },
    });
  }

  async findBookingsByTechnician(technicianId: string) {
    return this.prisma.booking.findMany({
      where: { technicianId },
      include: { maintenanceRequest: true },
      orderBy: { scheduledAt: 'asc' },
    });
  }
}
