import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './services/vacancy.service';
import { VacancyRepository } from './repositories/vacancy.repository';

@Module({
  controllers: [VacancyController],
  providers: [VacancyService, VacancyRepository],
  exports: [VacancyService],
})
export class VacancyModule {}
