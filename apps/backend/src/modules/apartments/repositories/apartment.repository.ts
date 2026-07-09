import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateApartmentDto, CreateBuildingDto, CreateUnitDto } from '../dto/apartment.dto';

@Injectable()
export class ApartmentRepository {
  private prisma = new PrismaClient();

  async createApartment(data: CreateApartmentDto) {
    return this.prisma.apartment.create({ data });
  }

  async createBuilding(data: CreateBuildingDto) {
    return this.prisma.building.create({ data });
  }

  async createUnit(data: CreateUnitDto) {
    return this.prisma.unit.create({ data });
  }

  async findApartmentById(id: string) {
    return this.prisma.apartment.findUnique({
      where: { id },
      include: { buildings: { include: { units: true } } },
    });
  }

  async findBuildingsByApartment(apartmentId: string) {
    return this.prisma.building.findMany({
      where: { apartmentId },
      include: { units: true },
    });
  }
}
