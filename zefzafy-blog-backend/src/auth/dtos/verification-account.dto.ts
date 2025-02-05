import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class VerificationAccountDto {
  @IsNumber()
  @IsNotEmpty()
  verificationCode : number;

  @IsEmail()
  email: string;
}
