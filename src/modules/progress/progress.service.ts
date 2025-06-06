import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgressService {
  getHello(): string {
    return 'Progress!';
  }
}
