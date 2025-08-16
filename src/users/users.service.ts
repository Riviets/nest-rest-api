import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createUserDTO: CreateUserDTO) {
    return this.databaseService.user.create({
      data: createUserDTO,
    });
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDTO,
    });
  }

  async delete(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
