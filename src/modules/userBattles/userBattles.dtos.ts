import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserBattlesDto {
  @IsNumber()
  battle_id: number;
}

export class UpdateUserBattlesDto {
  @IsNumber()
  battle_id: number;
}
