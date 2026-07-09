import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ResidentService } from './services/resident.service';
import { AssignResidentDto } from './dto/resident.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('residents')
@UseGuards(AuthGuard)
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post('assign')
  async assign(@Req() req, @Body() dto: AssignResidentDto) {
    return this.residentService.assignToApartment(req.user, dto);
  }

  @Get('apartment/:apartmentId')
  async getByApartment(@Param('apartmentId') apartmentId: string) {
    return this.residentService.getApartmentResidents(apartmentId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return this.residentService.removeResident(req.user, id);
  }
}
