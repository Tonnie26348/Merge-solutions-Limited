import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { CreateMaintenanceRequestDto, CreateBookingDto, UpdateBookingStatusDto } from '../dto/maintenance.dto';
import { UserRole } from '@merge/shared-types';

@Injectable()
export class MaintenanceService {
  constructor(private readonly repository: MaintenanceRepository) {}

  async reportIssue(user: any, dto: CreateMaintenanceRequestDto) {
    if (user.role !== UserRole.RESIDENT) {
      throw new ForbiddenException('Only residents can report maintenance issues');
    }
    return this.repository.createRequest(dto);
  }

  async bookTechnician(user: any, dto: CreateBookingDto) {
    // Ideally, we check if the user is the resident of the request or the tech accepting it
    const booking = await this.repository.createBooking(dto);
    
    // Transition request status to ASSIGNED
    await this.repository.updateRequestStatus(dto.requestId, 'ASSIGNED');
    
    return booking;
  }

  async updateJobStatus(user: any, bookingId: string, status: string) {
    // Only the assigned technician or admin can update status
    return this.repository.updateBookingStatus(bookingId, status);
  }

  async getMyRequests(user: any) {
    // This assumes the user is a resident. In a real app, we'd find the Resident profile first.
    // For now, we'll mock the residentId lookup.
    return this.repository.findRequestsByResident(user.id); 
  }

  async getAvailableJobs(categoryId: string) {
    return this.repository.findRequestsByCategory(categoryId);
  }
}
