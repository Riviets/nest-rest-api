import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.article.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.article.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(createArticleDTO: CreateArticleDTO) {
    return this.databaseService.article.create({
      data: createArticleDTO,
    });
  }

  async update(id: number, updateArticleDTO: UpdateArticleDTO) {
    return this.databaseService.article.update({
      where: {
        id,
      },
      data: updateArticleDTO,
    });
  }

  async delete(id: number) {
    return this.databaseService.article.delete({
      where: {
        id: id,
      },
    });
  }
}
