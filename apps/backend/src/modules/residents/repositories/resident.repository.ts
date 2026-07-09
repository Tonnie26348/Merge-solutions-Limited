import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AssignResidentDto } from '../dto/resident.dto';

@Injectable()
export class ResidentRepository {
  private prisma = new PrismaClient();

  async assignResident(data: AssignResidentDto) {
    return this.prisma.resident.create({ data });
  }

  async findResidentsByApartment(apartmentId: string) {
    return this.prisma.resident.findMany({
      where: { apartmentId },
      include: { 
        user: true, 
        unit: true 
      },
    });
  }

  async removeResident(residentId: string) {
    return this.prisma.resident.delete({
      where: { id: residentId },
    });
  }
}
