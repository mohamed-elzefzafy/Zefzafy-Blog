import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class VerificationCodeDto {
  @IsNumber()
  @IsNotEmpty()
  verificationCode : number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  newPassword : string;
}
