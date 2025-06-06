import { Injectable } from '@nestjs/common';

@Injectable()
export class BattlesService {
  getHello(): string {
    return 'Battles!';
  }
}
