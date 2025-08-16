import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ArticlesModule, UsersModule, DatabaseModule],
})
export class AppModule {}
