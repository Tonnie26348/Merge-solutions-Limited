import { Module } from '@nestjs/common';
import { TechnicianController } from './technician.controller';
import { TechnicianService } from './services/technician.service';
import { TechnicianRepository } from './repositories/technician.repository';

@Module({
  controllers: [TechnicianController],
  providers: [TechnicianService, TechnicianRepository],
  exports: [TechnicianService],
})
export class TechnicianModule {}
