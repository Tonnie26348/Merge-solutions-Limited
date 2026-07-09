import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { CreateReviewDto } from './dto/review.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reviews')
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async submitReview(@Req() req, @Body() dto: CreateReviewDto) {
    return this.reviewService.submitReview(req.user, dto);
  }

  @Get('technician/:id')
  async getReviews(@Param('id') id: string) {
    return this.reviewService.getTechnicianReviews(id);
  }
}
