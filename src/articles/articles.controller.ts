import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Get()
  async getAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Post()
  async createArticle(
    @Body(ValidationPipe) createArticleDTO: CreateArticleDTO,
  ) {
    return this.articlesService.create(createArticleDTO);
  }

  @Put(':id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateArticleDTO: UpdateArticleDTO,
  ) {
    return this.articlesService.update(id, updateArticleDTO);
  }

  @Delete(':id')
  async deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.delete(id);
  }
}
