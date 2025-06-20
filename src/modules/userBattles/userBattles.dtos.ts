import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserBattlesDto {
  @IsString()
  user_id: string;

  @IsNumber()
  battle_id: number;

  // @IsBoolean()
  // unlocked?: boolean;
}

export class UpdateUserBattlesDto {
  @IsString()
  user_id: string;

  @IsNumber()
  battle_id: number;

  @IsBoolean()
  completed: boolean;
}
