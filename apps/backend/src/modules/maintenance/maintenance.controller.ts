import { Controller, Post, Get, Put, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { MaintenanceService } from './services/maintenance.service';
import { CreateMaintenanceRequestDto, CreateBookingDto, UpdateBookingStatusDto } from './dto/maintenance.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('maintenance')
@UseGuards(AuthGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post('report')
  async reportIssue(@Req() req, @Body() dto: CreateMaintenanceRequestDto) {
    return this.maintenanceService.reportIssue(req.user, dto);
  }

  @Post('book')
  async bookTechnician(@Req() req, @Body() dto: CreateBookingDto) {
    return this.maintenanceService.bookTechnician(req.user, dto);
  }

  @Put('booking/:id/status')
  async updateStatus(@Req() req, @Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
    return this.maintenanceService.updateJobStatus(req.user, id, dto.status);
  }

  @Get('my-requests')
  async getMyRequests(@Req() req) {
    return this.maintenanceService.getMyRequests(req.user);
  }

  @Get('marketplace')
  async getMarketplace(@Query('categoryId') categoryId: string) {
    return this.maintenanceService.getAvailableJobs(categoryId);
  }
}
