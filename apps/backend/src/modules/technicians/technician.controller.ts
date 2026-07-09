import { Controller, Post, Get, Put, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { TechnicianService } from './services/technician.service';
import { CreateTechnicianProfileDto, UpdateTechnicianStatusDto, AddCategoryToTechDto } from './dto/technician.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('technicians')
@UseGuards(AuthGuard)
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Post('profile')
  async createProfile(@Req() req, @Body() dto: CreateTechnicianProfileDto) {
    return this.technicianService.createProfile(req.user, dto);
  }

  @Put('verify/:id')
  async verify(@Req() req, @Param('id') id: string, @Body() dto: UpdateTechnicianStatusDto) {
    return this.technicianService.verifyTechnician(req.user, id, dto.status);
  }

  @Post('category')
  async addCategory(@Req() req, @Body() dto: AddCategoryToTechDto) {
    return this.technicianService.assignCategory(req.user, dto);
  }

  @Get('marketplace')
  async getMarketplace(@Query('categoryId') categoryId?: string) {
    return this.technicianService.getMarketplace(categoryId);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.technicianService.getProfile(id);
  }
}
