import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
