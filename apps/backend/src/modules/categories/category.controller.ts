import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user, dto);
  }

  @Get()
  async getAll() {
    return this.categoryService.getAllCategories();
  }
}
