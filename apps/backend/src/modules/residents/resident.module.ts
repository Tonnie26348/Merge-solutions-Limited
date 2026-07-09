import { Module } from '@nestjs/common';
import { ResidentController } from './resident.controller';
import { ResidentService } from './services/resident.service';
import { ResidentRepository } from './repositories/resident.repository';

@Module({
  controllers: [ResidentController],
  providers: [ResidentService, ResidentRepository],
  exports: [ResidentService],
})
export class ResidentModule {}
