import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './services/apartment.service';
import { ApartmentRepository } from './repositories/apartment.repository';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService, ApartmentRepository],
  exports: [ApartmentService],
})
export class ApartmentModule {}
