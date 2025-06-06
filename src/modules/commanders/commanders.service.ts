import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandersService {
  getHello(): string {
    return 'Commanders!';
  }
}
