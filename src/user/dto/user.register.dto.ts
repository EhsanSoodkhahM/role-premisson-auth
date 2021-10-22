import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  age?: number;
}
