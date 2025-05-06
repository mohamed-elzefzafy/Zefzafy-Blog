import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
 
class CloudinaryImageDto {
    @IsString()
  secure_url: string;

  @IsString()
  public_id: string;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  user?: number; 

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) 
  category: number;


  @IsOptional()
  @ValidateNested()
  @Type(() => ImageData)
  image?: CloudinaryImageDto;
}
