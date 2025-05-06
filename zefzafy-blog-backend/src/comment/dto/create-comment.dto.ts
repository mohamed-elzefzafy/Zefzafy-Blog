import { IsNotEmpty,   IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  text: string;
}
 