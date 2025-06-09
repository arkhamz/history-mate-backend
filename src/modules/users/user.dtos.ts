import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  display_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
