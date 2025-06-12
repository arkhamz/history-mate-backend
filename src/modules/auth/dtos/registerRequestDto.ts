import { IsEmail, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  username: string;

  //   @IsEmail()
  //   email: string;

  @IsString()
  password: string;
}
