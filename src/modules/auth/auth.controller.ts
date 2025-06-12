import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './authTypes';

@Controller('auth-old')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: AuthInput) {
    //authenticate - validateUserPassword and generates jwt access token
    return await this.authService.authenticate(input);
  }
}
