import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from 'src/types';

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
