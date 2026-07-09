import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateApartmentDto, CreateBuildingDto, CreateUnitDto } from '../dto/apartment.dto';

@Injectable()
export class ApartmentRepository {
  constructor(private prisma: PrismaService) {}

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
}
