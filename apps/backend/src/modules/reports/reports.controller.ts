import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Response } from 'express';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get('export')
  async export(
    @Query('entity') entity: string,
    @Query('format') format: 'csv' | 'pdf',
    @Res() res: Response,
  ) {
    // Mock data fetch - in reality, inject relevant services based on entity
    const data = [{ id: 1, name: 'Sample', type: 'Data' }];
    
    if (format === 'csv') {
      const buffer = await this.reportService.generateCsv(data);
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } else {
      const buffer = await this.reportService.generatePdf(data);
      res.set('Content-Type', 'application/pdf');
      res.send(buffer);
    }
  }
}
