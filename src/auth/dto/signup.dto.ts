import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignupDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
