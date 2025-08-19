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
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
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
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
    }),
  )
  async createArticle(
    @Body(ValidationPipe) createArticleDTO: CreateArticleDTO,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.articlesService.create(createArticleDTO, imageFile);
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
