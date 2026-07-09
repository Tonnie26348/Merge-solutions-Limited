import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './services/ai.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('ai')
@UseGuards(AuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('diagnose')
  async diagnose(@Body() body: { description: string; issueType: string }) {
    return this.aiService.diagnoseIssue(body.description, body.issueType);
  }
}
