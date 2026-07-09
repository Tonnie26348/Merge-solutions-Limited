import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ApartmentRepository } from '../repositories/apartment.repository';
import { CreateApartmentDto, CreateBuildingDto, CreateUnitDto } from '../dto/apartment.dto';
import { UserRole } from '@merge/shared-types';

@Injectable()
export class ApartmentService {
  constructor(private readonly repository: ApartmentRepository) {}

  async createApartment(user: any, dto: CreateApartmentDto) {
    if (user.role.name !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Only Super Admins can create new apartment complexes');
    }
    return this.repository.createApartment(dto);
  }

  async createBuilding(user: any, dto: CreateBuildingDto) {
    // In production, verify ownership here
    return this.repository.createBuilding(dto);
  }

  async createUnit(user: any, dto: CreateUnitDto) {
    return this.repository.createUnit(dto);
  }

  async getApartmentDetails(id: string) {
    const apartment = await this.repository.findApartmentById(id);
    if (!apartment) throw new NotFoundException('Apartment complex not found');
    return apartment;
  }
}
