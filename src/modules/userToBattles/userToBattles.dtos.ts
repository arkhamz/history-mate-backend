import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserToBattlesDto {
  @IsString()
  user_id: string;

  @IsNumber()
  battle_id: number;

  @IsBoolean()
  unlocked: boolean;
}
