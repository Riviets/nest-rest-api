import { Controller, Get, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(204)
  async getHello(): Promise<string> {
    return 'This is asynchronous function';
  }
}
