import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body: string;

  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
