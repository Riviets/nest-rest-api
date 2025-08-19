import { Transform } from 'class-transformer';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  authorId: number;

  @IsString()
  @IsOptional()
  image?: string;
}
