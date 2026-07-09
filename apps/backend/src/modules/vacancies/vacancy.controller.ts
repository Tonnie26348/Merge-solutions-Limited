import { Controller, Post, Get, Put, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { VacancyService } from './services/vacancy.service';
import { CreateVacancyDto, ApplyToVacancyDto } from './dto/vacancy.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('vacancies')
@UseGuards(AuthGuard)
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async list(@Query() filters: any) {
    return this.vacancyService.listVacancies(filters);
  }

  @Post()
  async create(@Req() req, @Body() dto: CreateVacancyDto) {
    return this.vacancyService.createListing(req.user, dto);
  }

  @Post('apply')
  async apply(@Req() req, @Body() dto: ApplyToVacancyDto) {
    return this.vacancyService.submitApplication(req.user, dto);
  }

  @Put('application/:id/status')
  async updateStatus(@Req() req, @Param('id') id: string, @Body() dto: { status: string }) {
    return this.vacancyService.reviewApplication(req.user, id, dto.status);
  }

  @Get(':id/applications')
  async getApplications(@Req() req, @Param('id') id: string) {
    return this.vacancyService.getApplications(req.user, id);
  }
}
