import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  text: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  post: number;
}
